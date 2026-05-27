import React from 'react';
import { Image, Text, View } from 'react-native';
import { styles } from '../styles';

interface CardMonitoramentoProps {
  litros: string;
  volume: string;
}

export function CardMonitoramento({ litros, volume }: CardMonitoramentoProps) {
  return (
    <View style={styles.cardContainer}>
      {/* Container da Esquerda: Imagem Quadrada e Responsiva */}
      <View style={styles.containerImagem}>
        <Image
          source={{
            uri: 'https://imgs.search.brave.com/_Lep-XudKASpVr1USJyxWEr5NjCGXQP-y36o32auZtA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90b3MtZ3JhdGlz/L2Vub3JtZS10YW5x/dWUtZGUtcGxhc3Rp/Y28tcGFyYS1hZ3Vh/LWlzb2xhZGEtbm8t/YnJhbmNvXzkzNjc1/LTEzNTIzOC5qcGc_/c2VtdD1haXNfaHli/cmlk',
          }}
          style={styles.caixaDaguaImg}
          resizeMode="cover"
        />
      </View>

      {/* Container da Direita: Colunas de Informação */}
      <View style={styles.containerInformacoes}>
        <View style={[styles.blocoInfo, styles.blocoLitros]}>
          <Text style={styles.rotuloInfo}>Litros Atual</Text>
          <Text style={styles.valorInfo}>{litros}</Text>
        </View>

        <View style={[styles.blocoInfo, styles.blocoVolume]}>
          <Text style={styles.rotuloInfo}>Volume Total</Text>
          <Text style={styles.valorInfo}>{volume}</Text>
        </View>
      </View>
    </View>
  );
}