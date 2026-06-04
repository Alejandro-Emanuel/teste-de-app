import { Text, View } from 'react-native';
import { styles } from '../styles';
import { CardStatisticas } from '../componentes/CardStatisticas';

export function EstatisticasScreen() {
  return (
    <View style={styles.container}>

      <View style={styles.containerGraficos}>
      </View>

      <View style={styles.containerIstatisticas}>
        <CardStatisticas litros="450 Litros" volume="75% Volume" F_Lotar='35% Para completar'/>
        </View>
      <Text style={styles.titulo}>Estatisticas</Text>
      <Text style={styles.subtitulo}>
        Neste setor nos iremos adicionar as Estatisticas de uso do sistema de verificação
      </Text>
    </View>
  );
}