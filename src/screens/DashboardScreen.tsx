import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { DrawerActions } from '@react-navigation/native';
import { Pressable, Text, View } from 'react-native';
import type { RootTabParamList } from '../navigation/AppTabs';
import { styles } from '../styles';

type Props = BottomTabScreenProps<RootTabParamList, 'Dashboard'>;

export function DashboardScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pagina principal</Text>
      <Text style={styles.subtitulo}>
        É aqui q nos vamos colocar o icone principal.
      </Text>

      <Pressable
        style={styles.botaoSecundario}
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      >
        <Text style={styles.botaoSecundarioTexto}>Abrir menu lateral</Text>
      </Pressable>
    </View>
  );
}