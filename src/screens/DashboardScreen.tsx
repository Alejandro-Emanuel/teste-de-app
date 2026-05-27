import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { DrawerActions } from '@react-navigation/native';
import { Pressable, Text, View } from 'react-native';
import { CardMonitoramento } from '../componentes/CardMonitoramento';
import type { RootTabParamList } from '../navigation/AppTabs';
import { styles } from '../styles';

type Props = BottomTabScreenProps<RootTabParamList, 'Dashboard'>;

export function DashboardScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Painel Principal</Text>
      <Text style={styles.subtitulo}>Status em tempo real do seu sistema</Text>

      <CardMonitoramento litros="450 Litros" volume="75% Volume" />

      <Pressable
        style={styles.botaoSecundario}
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      >
        <Text style={styles.botaoSecundarioTexto}>Abrir menu lateral</Text>
      </Pressable>
    </View>
  );
}