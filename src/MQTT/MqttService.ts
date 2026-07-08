import mqtt, { MqttClient } from 'mqtt';

const BROKER_URL = 'ws://broker.hivemq.com:8000/mqtt'; 
const TOPICO = 'edu/caixa/dados';

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
    client?.subscribe(TOPICO, (err) => {
      if (err) console.error('Erro ao subscrever:', err);
      else console.log(`📡 Subscrito em: ${TOPICO}`);
    });
  });

  client.on('message', (_topico, payload) => {
    try {
      const dados: DadosMQTT = JSON.parse(payload.toString());

      if (
        typeof dados.litros === 'number' &&
        typeof dados.volume === 'number' &&
        typeof dados.fLotar === 'number'
      ) {
        onDados(dados);
      } else {
        console.warn('Payload MQTT inválido:', dados);
      }
    } catch (e) {
      console.error('Erro ao parsear payload MQTT:', e);
    }
  });

  client.on('error', (err) => {
    console.error('rro MQTT:', err.message);
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