import Ionicons from '@expo/vector-icons/Ionicons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AppTabs } from './AppTabs';
import { ConfiguracoesScreen } from '../screens/ConfiguracoesScreen';

export type RootDrawerParamList = {
  PainelPrincipal: undefined;
  Configuracoes: undefined;
};

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export function AppDrawer() {
  return (
    <Drawer.Navigator
      initialRouteName="PainelPrincipal"
      screenOptions={({ route }) => ({
        headerStyle: { backgroundColor: '#0f172a' },
        headerTintColor: '#f8fafc',
        drawerActiveTintColor: '#00ABE4',
        drawerInactiveTintColor: '#334155',
        drawerIcon: ({ focused, color, size }) => (
          <Ionicons
            name={
              route.name === 'PainelPrincipal'
                ? focused ? 'grid' : 'grid-outline'
                : focused ? 'settings' : 'settings-outline'
            }
            color={color}
            size={size}
          />
        ),
      })}
    >
      <Drawer.Screen
        name="PainelPrincipal"
        component={AppTabs}
        options={{ title: 'Aplicativo', headerShown: false }}
      />
      <Drawer.Screen
        name="Configuracoes"
        component={ConfiguracoesScreen}
        options={{ title: 'Configurações' }}
      />
    </Drawer.Navigator>
  );
}