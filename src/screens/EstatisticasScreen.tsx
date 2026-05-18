import { Text, View } from 'react-native';
import { styles } from '../styles';

export function EstatisticasScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Estatisticas</Text>
      <Text style={styles.subtitulo}>
        Neste setor nos iremos adicionar as Estatisticas de uso do sistema de verificação
      </Text>
    </View>
  );
}