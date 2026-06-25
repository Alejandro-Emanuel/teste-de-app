import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles';
import { useCaixa } from '../context/CaixaContext';

function clamp(valor: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, valor));
}

export function CardStatisticas() {
  const { dados } = useCaixa();
  const volumeSeguro = clamp(dados.volume, 0, 100);

  return (
    <View style={styles.statCard}>

      <View style={styles.statCardHeader}>
        <Text style={styles.statCardTitulo}>Caixa d'água</Text>
        <View style={styles.statBadge}>
          <Text style={styles.statBadgeTexto}>Ativo</Text>
        </View>
      </View>

      <View style={styles.statRow}>
        <View style={styles.statBloco}>
          <Text style={styles.statLabel}>Litros atual</Text>
          <Text style={[styles.statValor, { color: '#00ABE4' }]}>
            {dados.litros}<Text style={styles.statUnidade}> L</Text>
          </Text>
        </View>

        <View style={styles.statBloco}>
          <Text style={styles.statLabel}>Volume</Text>
          <Text style={styles.statValor}>
            {volumeSeguro}<Text style={styles.statUnidade}>%</Text>
          </Text>
        </View>

        <View style={styles.statBloco}>
          <Text style={styles.statLabel}>Para completar</Text>
          <Text style={[styles.statValor, { color: '#F5C475' }]}>
            {dados.fLotar}<Text style={styles.statUnidade}>%</Text>
          </Text>
        </View>
      </View>

    </View>
  );
}