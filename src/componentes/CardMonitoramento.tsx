import React from 'react';
import { Image, Text, View } from 'react-native';
import { styles } from '../styles';

const iconesPorVolume = [
  require('../../assets/Icone0.jpg'),   // 0–16%
  require('../../assets/icone1.jpeg'),  // 17–33%
  require('../../assets/icone2.jpeg'),  // 34–50%
  require('../../assets/icone3.jpeg'),  // 51–66%
  require('../../assets/icone4.jpeg'),  // 67–83%
  require('../../assets/icone5.jpeg'),  // 84–100%
];

function obterIcone(volumePercent: number) {
  const indice = Math.min(
    Math.floor(volumePercent / (100 / iconesPorVolume.length)),
    iconesPorVolume.length - 1
  );
  return iconesPorVolume[indice];
}

interface CardMonitoramentoProps {
  litros: string;
  volume: number;
}

export function CardMonitoramento({ litros, volume }: CardMonitoramentoProps) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.containerImagem}>
        <Image
          source={obterIcone(volume)}  
          style={styles.caixaDaguaImg}
          resizeMode="cover"
        />
      </View>

      <View style={styles.containerInformacoes}>
        <Text style={styles.valorInfo}>{litros}</Text>
        <Text style={styles.valorInfo}>{volume}% Volume</Text>
      </View>
    </View>
  );
}