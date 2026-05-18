import { NavigationContainer } from '@react-navigation/native';
import { AppDrawer } from './AppDrawer';

export function RootNavigator() {
  return (
    <NavigationContainer>
      <AppDrawer />
    </NavigationContainer>
  );
}