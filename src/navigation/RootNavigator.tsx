
import { createDrawerNavigator } from '@react-navigation/drawer';
import { AppTabs } from './AppTabs';
import { ConfiguracoesScreen } from '../screens/ConfiguracoesScreen';

const Drawer = createDrawerNavigator();

export function RootNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Inicio" component={AppTabs} />
      <Drawer.Screen name="Configuracoes" component={ConfiguracoesScreen} />
    </Drawer.Navigator>
  );
}