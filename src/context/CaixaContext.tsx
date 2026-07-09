import React, { createContext, useContext, useEffect, useState } from 'react';
import { conectarMQTT, desconectarMQTT } from '../MQTT/MqttService';
import { getDb } from '../database/database';

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

  useEffect(() => {
    conectarMQTT((novosDados) => {
      setConectado(true);
      setDadosState(novosDados);
      salvarNoBanco(novosDados);
    });

    return () => {
      desconectarMQTT();
      setConectado(false);
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