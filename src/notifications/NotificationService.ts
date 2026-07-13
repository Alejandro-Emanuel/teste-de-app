import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { salvarNotificacao } from '../database/notificacaoService';

const CANAL_ALERTAS = 'alertas-caixa-agua';

// Define como a notificação deve se comportar quando o app está aberto (foreground).
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

let configurado = false;

/**
 * Solicita permissão do usuário e cria o canal de notificação no Android.
 * Deve ser chamado uma vez, no início do app (ex: dentro do CaixaProvider).
 */
export async function configurarNotificacoes(): Promise<void> {
  if (configurado) return;
  configurado = true;

  try {
    const { status: statusAtual } = await Notifications.getPermissionsAsync();
    let statusFinal = statusAtual;

    if (statusAtual !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      statusFinal = status;
    }

    if (statusFinal !== 'granted') {
      console.warn('Permissão de notificação negada pelo usuário.');
    }

    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync(CANAL_ALERTAS, {
        name: 'Alertas da Caixa d\u2019Água',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#007bff',
      });
    }
  } catch (error) {
    console.error('Erro ao configurar notificações:', error);
  }
}

/**
 * Dispara um alerta: salva no histórico (SQLite, aba de Notificações)
 * e mostra uma notificação local na bandeja do dispositivo.
 */
export async function dispararAlerta(titulo: string, mensagem: string): Promise<void> {
  await salvarNotificacao(titulo, mensagem);

  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: titulo,
        body: mensagem,
        sound: true,
      },
      // No Android, um trigger com apenas channelId dispara imediatamente já associado ao canal certo.
      // No iOS/web, channelId não existe, então usamos null (imediato).
      trigger: Platform.OS === 'android' ? { channelId: CANAL_ALERTAS } : null,
    });
  } catch (error) {
    console.error('Erro ao disparar notificação local:', error);
  }
}
