import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import { CardMonitoramento } from '../componentes/CardMonitoramento';
import type { RootTabParamList } from '../navigation/AppTabs';
import { styles } from '../styles';

type Props = BottomTabScreenProps<RootTabParamList, 'Dashboard'>;

export function DashboardScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Caixa principal</Text>
      <Text style={styles.subtitulo}>Estado da sua caixa d'água</Text>

      <CardMonitoramento />
    </View>
  );
}