import { Text, View } from 'react-native';
import { styles } from '../styles';
import { CardStatisticas } from '../componentes/CardStatisticas';

export function EstatisticasScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Estatísticas avançadas</Text>
      <Text style={styles.subtitulo}>
        Status em tempo real
      </Text>

      <CardStatisticas />
    </View>
  );
}