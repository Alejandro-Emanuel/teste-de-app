import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { AtendimentosScreen } from '../screens/AtendimentosScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { EstatisticasScreen } from '../screens/EstatisticasScreen';

export type RootTabParamList = {
  Dashboard: undefined;
  Atendimentos: undefined;
  Relatorios: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

function obterIcone(nomeRota: keyof RootTabParamList, focused: boolean) {
  if (nomeRota === 'Dashboard') return focused ? 'home' : 'home-outline';
  if (nomeRota === 'Atendimentos') return focused ? 'list' : 'list-outline';
  return focused ? 'bar-chart' : 'bar-chart-outline';
}

export function AppTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: '#0f172a' },
        headerTintColor: '#f8fafc',
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
      <Tab.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Painel' }} />
      <Tab.Screen name="Atendimentos" component={AtendimentosScreen} options={{ title: 'Atendimentos' }} />
      <Tab.Screen name="Relatorios" component={EstatisticasScreen} options={{ title: 'Estatisticas' }} />
    </Tab.Navigator>
  );
}