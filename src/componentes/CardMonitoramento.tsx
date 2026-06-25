import React from 'react';
import { Image, Text, View } from 'react-native';
import { styles } from '../styles';
import { useCaixa } from '../context/CaixaContext';

const iconesPorVolume = [
  require('../../assets/Icone0.jpg'),
  require('../../assets/icone1.jpeg'),
  require('../../assets/icone2.jpeg'),
  require('../../assets/icone3.jpeg'),
  require('../../assets/icone4.jpeg'),
  require('../../assets/icone5.jpeg'),
];

function clamp(valor: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, valor));
}

function obterIcone(volumePercent: number) {
  const volumeSeguro = clamp(volumePercent, 0, 100);
  const indice = Math.min(
    Math.floor(volumeSeguro / (100 / iconesPorVolume.length)),
    iconesPorVolume.length - 1
  );
  return iconesPorVolume[indice];
}

export function CardMonitoramento() {
  const { dados } = useCaixa();
  const volumeSeguro = clamp(dados.volume, 0, 100);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.containerImagem}>
        <Image
          source={obterIcone(volumeSeguro)}
          style={styles.caixaDaguaImg}
          resizeMode="cover"
        />
      </View>

      <View style={styles.containerInformacoes}>
        <View style={[styles.blocoInfo, styles.blocoLitros]}>
          <Text style={styles.rotuloInfo}>Litros atual</Text>
          <Text style={styles.valorInfo}>{dados.litros} L</Text>
        </View>
        <View style={[styles.blocoInfo, styles.blocoVolume]}>
          <Text style={styles.rotuloInfo}>Volume</Text>
          <Text style={styles.valorInfo}>{volumeSeguro}%</Text>
        </View>
      </View>
    </View>
  );
}