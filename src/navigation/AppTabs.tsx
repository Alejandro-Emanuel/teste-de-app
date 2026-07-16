import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DashboardScreen } from '../screens/DashboardScreen';
import { EstatisticasScreen } from '../screens/EstatisticasScreen';
import { NotificacoesScreen } from '../screens/NotificacaoScreen';
import { Pressable, View } from 'react-native';

export type RootTabParamList = {
  Dashboard: undefined;
  Estatistica: undefined;
  Notificacoes: undefined;
};
const Tab = createBottomTabNavigator<RootTabParamList>();

function obterIcone(nomeRota: keyof RootTabParamList, focused: boolean) {
  switch (nomeRota) {
    case 'Dashboard':
      return focused ? 'home' : 'home-outline';

    case 'Estatistica':
      return focused ? 'bar-chart' : 'bar-chart-outline';

    case 'Notificacoes':
      return focused ? 'notifications' : 'notifications-outline';
  }
}

export function AppTabs() {
  return (
   <Tab.Navigator
  initialRouteName="Dashboard"
  screenOptions={({ route, navigation }) => ({
    headerStyle: { backgroundColor: '#0f172a' },
    headerTintColor: '#f8fafc',

    headerRight: () => (
      <Pressable
        onPress={() => navigation.navigate('Notificacoes')}
        style={{
          marginRight: 16,
          position: 'relative',
        }}
      >
        <Ionicons
          name="notifications-outline"
          size={28}
          color="#00ABE4"
        />

        {}
        <View
          style={{
            position: 'absolute',
            top: -2,
            right: -2,
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: 'red',
          }}
        />
      </Pressable>
    ),

    tabBarActiveTintColor: '#00ABE4',
    tabBarInactiveTintColor: '#64748b',
    tabBarStyle: { height: 62, paddingBottom: 8, paddingTop: 6 },

    tabBarIcon: ({ focused, color, size }) => (
      <Ionicons
        name={obterIcone(route.name as keyof RootTabParamList, focused)}
        color={color}
        size={size}
      />
    ),
  })}
>
       <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Principal' }} />
      <Tab.Screen name="Estatistica" component={EstatisticasScreen} options={{ title: 'Estatisticas' }} />
      <Tab.Screen name="Notificacoes"component={NotificacoesScreen}options={{title: 'Notificações',tabBarButton: () => null,  }}/>
    </Tab.Navigator>
  );
}