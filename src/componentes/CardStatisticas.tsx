import React from 'react';
import { Image, Text, View } from 'react-native';
import { styles } from '../styles';

interface CardMonitoramentoProps {
  litros: string;
  volume: string;
  F_Lotar: string;
}

export function CardStatisticas({ litros, volume, F_Lotar }: CardMonitoramentoProps) {
  return (
      <View style={styles.cardContainer}>
        
  
        <View style={styles.containerIstatisticas}>
          <View style={[styles.blocoInfo]}>
            <Text style={styles.rotuloInfo}>Litros Atual</Text>
            <Text style={styles.valorInfo}>{litros}</Text>
          </View>
  
          <View style={[styles.blocoInfo]}>
            <Text style={styles.rotuloInfo}>Volume Total</Text>
            <Text style={styles.valorInfo}>{volume}</Text>
          </View>

          <View style={[styles.blocoInfo]}>
            <Text style={styles.rotuloInfo}>Faltando</Text>
            <Text style={styles.valorInfo}>{F_Lotar}</Text>
          </View>

        </View>
      </View>
    );
  }