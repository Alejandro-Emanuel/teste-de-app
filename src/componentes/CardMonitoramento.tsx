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
          source={
            require('../../assets/Icone0.jpg')
          }
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