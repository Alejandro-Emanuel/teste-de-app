import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { DrawerActions } from '@react-navigation/native';
import { Pressable, Text, View } from 'react-native';
import type { RootTabParamList } from '../navigation/AppTabs';
import { styles } from '../styles';

type Props = BottomTabScreenProps<RootTabParamList, 'Dashboard'>;

export function DashboardScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Painel operacional</Text>
      <Text style={styles.subtitulo}>
        Use as abas para alternar as áreas principais e abra o menu lateral para configurações.
      </Text>

      <Pressable
        style={styles.botaoPrimario}
        onPress={() => navigation.navigate('Atendimentos')}
      >
        <Text style={styles.botaoPrimarioTexto}>Ir para Atendimentos</Text>
      </Pressable>

      <Pressable
        style={styles.botaoSecundario}
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      >
        <Text style={styles.botaoSecundarioTexto}>Abrir menu lateral</Text>
      </Pressable>
    </View>
  );
}