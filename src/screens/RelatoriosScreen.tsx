import { Text, View } from 'react-native';
import { styles } from '../styles';

export function RelatoriosScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Relatórios</Text>
      <Text style={styles.subtitulo}>
        Nesta área você pode consolidar números e evolução semanal.
      </Text>
    </View>
  );
}