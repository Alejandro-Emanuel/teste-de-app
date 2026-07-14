import mqtt, { MqttClient } from 'mqtt';

const BROKER_URL = 'wss://broker.hivemq.com:8884/mqtt'; 
const TOPICO_DADOS = 'edu/caixa/dados';
const TOPICO_CONFIG_LITROS = 'edu/caixa/config_litros';
const TOPICO_CONFIG_FORMATO = 'edu/caixa/config_formato';

let client: MqttClient | null = null;

export interface DadosMQTT {
  litros: number;
  volume: number;
  fLotar: number;
}

export function conectarMQTT(onDados: (dados: DadosMQTT) => void) {
  if (client) return;

  client = mqtt.connect(BROKER_URL, {
    clientId: `expo_caixa_${Math.random().toString(16).slice(2)}`,
    clean: true,
    reconnectPeriod: 3000,  
    connectTimeout: 10000,
  });

  client.on('connect', () => {
    console.log('Conectado ao Mosquitto');
    client?.subscribe(TOPICO_DADOS, (err) => {
      if (err) console.error('Erro ao subscrever:', err);
      else console.log(`Subscrito em: ${TOPICO_DADOS}`);
    });
  });

  client.on('message', (_topico, payload) => {
    try {
      const bruto: Record<string, unknown> = JSON.parse(payload.toString());

      const normalizado: Record<string, unknown> = {};
      for (const chave in bruto) {
        normalizado[chave.toLowerCase()] = bruto[chave];
      }

      const dados: DadosMQTT = {
        litros: normalizado['litros'] as number,
        volume: normalizado['volume'] as number,
        fLotar: normalizado['flotar'] as number,
      };

      if (
        typeof dados.litros === 'number' &&
        typeof dados.volume === 'number' &&
        typeof dados.fLotar === 'number'
      ) {
        onDados(dados);
      } else {
        console.warn('Payload MQTT inválido:', bruto);
      }
    } catch (e) {
      console.error('Erro ao parsear payload MQTT:', e);
    }
  });

  client.on('error', (err) => {
    console.error('Erro MQTT:', err.message);
  });

  client.on('reconnect', () => {
    console.log('Reconectando ...');
  });

  client.on('offline', () => {
    console.warn('Broker esta sem conexão');
  });
}

export function desconectarMQTT() {
  client?.end(true);
  client = null;
}

export function publicarCapacidade(litros: number) {
  client?.publish(TOPICO_CONFIG_LITROS, String(litros));
}

export function publicarFormato(formato: 'quadrada' | 'redonda') {
  client?.publish(TOPICO_CONFIG_FORMATO, formato);
}