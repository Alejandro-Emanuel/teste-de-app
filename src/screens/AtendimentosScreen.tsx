import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { Pressable, Text, View } from 'react-native';
import type { RootTabParamList } from '../navigation/AppTabs';
import { styles } from '../styles';

type Props = BottomTabScreenProps<RootTabParamList, 'Atendimentos'>;

export function AtendimentosScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Atendimentos do dia</Text>
      <Text style={styles.subtitulo}>
        Esta aba representa um fluxo recorrente de trabalho de campo.
      </Text>

      <Pressable style={styles.botaoPrimario} onPress={() => navigation.navigate('Relatorios')}>
        <Text style={styles.botaoPrimarioTexto}>Ver Relatórios</Text>
      </Pressable>
    </View>
  );
}