import { Text, View } from 'react-native';
import { styles } from '../styles';

export function ConfiguracoesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Configurações</Text>
      <Text style={styles.subtitulo}>
        Tela acessada pelo drawer possivelmente sera apagada.
      </Text>
    </View>
  );
}