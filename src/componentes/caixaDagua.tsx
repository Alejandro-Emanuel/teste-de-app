import { styles } from '../styles';
import { View, Image,} from 'react-native';

export function CaixaDagua() {
  return (
    <View style={styles.containerCaixaDagua}>
      <Image
        source={{uri: 'https://imgs.search.brave.com/_Lep-XudKASpVr1USJyxWEr5NjCGXQP-y36o32auZtA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtZ3JhdGlz/L2Vub3JtZS10YW5x/dWUtZGUtcGxhc3Rp/Y28tcGFyYS1hZ3Vh/LWlzb2xhZGEtbm8t/YnJhbmNvXzkzNjc1/LTEzNTIzOC5qcGc_/c2VtdD1haXNfaHli/cmlk'}}
        style={styles.caixaDagua}
        />
    </View>
  );
}