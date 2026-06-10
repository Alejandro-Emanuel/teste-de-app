import { Text, View } from 'react-native';
import { styles } from '../styles';
import { CardStatisticas } from '../componentes/CardStatisticas';

export function EstatisticasScreen() {
  return (
    <View style={styles.container}>

      <View style={styles.containerGraficos}>
      </View>

      <View style={styles.containerIstatisticas}>
        <CardStatisticas litros="450 Litros" volume="75% Volume" F_Lotar='35% Volume'/>
        </View>
    </View>
  );
}