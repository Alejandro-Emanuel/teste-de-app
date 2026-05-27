import { Text, View } from 'react-native';
import { styles } from '../componentes/styles';
import { CardStatisticas } from '../componentes/CardStatisticas';

export function EstatisticasScreen() {
  return (
    <View style={styles.container}>
      <CardStatisticas litros="450 Litros" volume="75% Volume" F_Lotar='35% Para completar'/>
      <Text style={styles.titulo}>Estatisticas</Text>
      <Text style={styles.subtitulo}>
        Neste setor nos iremos adicionar as Estatisticas de uso do sistema de verificação
      </Text>
    </View>
  );
}