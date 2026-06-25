import { NavigationContainer } from '@react-navigation/native';
import { CaixaProvider } from './src/context/CaixaContext';
import { RootNavigator } from './src/navigation/RootNavigator';

export default function App() {
  return (
    <CaixaProvider>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </CaixaProvider>
  );
}