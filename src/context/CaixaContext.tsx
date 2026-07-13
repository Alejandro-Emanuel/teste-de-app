import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { conectarMQTT, desconectarMQTT } from '../MQTT/MqttService';
import { getDb } from '../database/database';
import { buscarConfiguracao, limiteAlertaEmMemoria } from '../database/configuracaoService';
import { configurarNotificacoes, dispararAlerta } from '../notifications/NotificationService';

// Tempo sem receber dados do MQTT para considerarmos a conexão "caída".
const TIMEOUT_DESCONEXAO_MS = 30_000;

interface CaixaData {
  litros: number;
  volume: number;
  fLotar: number;
}

interface CaixaContextType {
  dados: CaixaData;
  setDados: (dados: CaixaData) => void;
  conectado: boolean;
}

const CaixaContext = createContext<CaixaContextType | null>(null);

async function salvarNoBanco(dados: CaixaData) {
  try {
    const db = await getDb();
    await db.runAsync(
      `INSERT INTO agua (litros_atuais, volume_percentual, para_completar_percentual)
       VALUES (?, ?, ?)`,
      [dados.litros, dados.volume, dados.fLotar]
    );
  } catch (e) {
    console.error('Erro ao salvar no SQLite:', e);
  }
}

export function CaixaProvider({ children }: { children: React.ReactNode }) {
  const [dados, setDadosState] = useState<CaixaData>({
    litros: 0,
    volume: 0,
    fLotar: 100,
  });
  const [conectado, setConectado] = useState(false);

  // Guardam se o alerta já está "ativo" para não notificar a cada mensagem MQTT,
  // só na transição (borda) de normal -> alerta.
  const nivelBaixoAtivoRef = useRef(false);
  const cheioAtivoRef = useRef(false);
  const desconectadoAtivoRef = useRef(false);
  const watchdogRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function reiniciarWatchdog() {
    if (watchdogRef.current) clearTimeout(watchdogRef.current);

    watchdogRef.current = setTimeout(() => {
      setConectado(false);
      if (!desconectadoAtivoRef.current) {
        desconectadoAtivoRef.current = true;
        dispararAlerta(
          'Sem conexão',
          'Não estamos recebendo dados da caixa d\u2019água há mais de 30 segundos. Verifique o dispositivo/broker MQTT.'
        );
      }
    }, TIMEOUT_DESCONEXAO_MS);
  }

  function verificarAlertas(novosDados: CaixaData) {
    // Nível baixo (borda de entrada e de saída)
    if (novosDados.volume <= limiteAlertaEmMemoria) {
      if (!nivelBaixoAtivoRef.current) {
        nivelBaixoAtivoRef.current = true;
        dispararAlerta(
          'Nível baixo',
          `O nível da caixa d\u2019água está em ${novosDados.volume}%, abaixo do limite de ${limiteAlertaEmMemoria}%.`
        );
      }
    } else {
      nivelBaixoAtivoRef.current = false;
    }

    // Caixa cheia (borda de entrada e de saída)
    if (novosDados.volume >= 100) {
      if (!cheioAtivoRef.current) {
        cheioAtivoRef.current = true;
        dispararAlerta('Caixa cheia', 'A caixa d\u2019água atingiu 100% da capacidade.');
      }
    } else {
      cheioAtivoRef.current = false;
    }
  }

  useEffect(() => {
    configurarNotificacoes();

    buscarConfiguracao().catch((e) => console.error('Erro ao carregar configuração de alertas:', e));

    conectarMQTT((novosDados) => {
      const estavaDesconectado = desconectadoAtivoRef.current;
      desconectadoAtivoRef.current = false;

      setConectado(true);
      setDadosState(novosDados);
      salvarNoBanco(novosDados);
      verificarAlertas(novosDados);
      reiniciarWatchdog();

      if (estavaDesconectado) {
        dispararAlerta('Conexão restabelecida', 'Voltamos a receber dados da caixa d\u2019água.');
      }
    });

    return () => {
      desconectarMQTT();
      setConectado(false);
      if (watchdogRef.current) clearTimeout(watchdogRef.current);
    };
  }, []);

  const setDados = (dados: CaixaData) => {
    setDadosState(dados);
  };

  return (
    <CaixaContext.Provider value={{ dados, setDados, conectado }}>
      {children}
    </CaixaContext.Provider>
  );
}

export function useCaixa() {
  const ctx = useContext(CaixaContext);
  if (!ctx) throw new Error('useCaixa deve ser usado dentro de CaixaProvider');
  return ctx;
}