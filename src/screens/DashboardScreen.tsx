import Ionicons from '@expo/vector-icons/Ionicons';
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

    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
      }}
    >
      <View>
        <Text style={styles.titulo}>Caixa principal</Text>
        <Text style={styles.subtitulo}>
          Estado da sua caixa d'água
        </Text>
      </View>

  

    </View>

    <CardMonitoramento />

  </View>
);}