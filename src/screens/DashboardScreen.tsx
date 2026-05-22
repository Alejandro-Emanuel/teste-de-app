import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { DrawerActions } from '@react-navigation/native';
import { Pressable, Text, View, Image } from 'react-native';
import type { RootTabParamList } from '../navigation/AppTabs';
import { styles } from '../styles';

type Props = BottomTabScreenProps<RootTabParamList, 'Dashboard'>;

export function DashboardScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pagina principal</Text>

      <View style={styles.containerCaixa}>
        <Image
          source={{uri: 'https://imgs.search.brave.com/_Lep-XudKASpVr1USJyxWEr5NjCGXQP-y36o32auZtA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtZ3JhdGlz/L2Vub3JtZS10YW5x/dWUtZGUtcGxhc3Rp/Y28tcGFyYS1hZ3Vh/LWlzb2xhZGEtbm8t/YnJhbmNvXzkzNjc1/LTEzNTIzOC5qcGc_/c2VtdD1haXNfaHli/cmlk'}}
          style={styles.caixaDaguaImg}
          resizeMode="cover"
          />
        <Text style={styles.litros}>(X) Litros</Text>
      </View>
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