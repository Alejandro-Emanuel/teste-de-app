import { useEffect, useState } from 'react';
import { Text, TextInput, View, Pressable, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { buscarConfiguracao, atualizarConfiguracao } from '../database/configuracaoService';
import { styles } from '../styles';

export function ConfiguracoesScreen() {
  const [capacidade, setCapacidade] = useState('1000');
  const [limiteAlerta, setLimiteAlerta] = useState('20');
  const [carregando, setCarregando] = useState(true);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) return;

    buscarConfiguracao()
      .then((config) => {
        setCapacidade(String(config.capacidade_maxima_litros));
        setLimiteAlerta(String(config.limite_alerta_minimo));
      })
      .finally(() => setCarregando(false));
  }, [isFocused]);

  async function handleSalvar() {
    const capacidadeNum = parseInt(capacidade, 10);
    const limiteNum = parseInt(limiteAlerta, 10);

    if (isNaN(capacidadeNum) || capacidadeNum <= 0) {
      Alert.alert('Valor inválido', 'Informe uma capacidade máxima válida (em litros).');
      return;
    }

    if (isNaN(limiteNum) || limiteNum < 0 || limiteNum > 100) {
      Alert.alert('Valor inválido', 'O limite de alerta deve ser um percentual entre 0 e 100.');
      return;
    }

    const sucesso = await atualizarConfiguracao(capacidadeNum, limiteNum);
    Alert.alert(sucesso ? 'Salvo!' : 'Erro', sucesso
      ? 'Configurações atualizadas com sucesso.'
      : 'Não foi possível salvar as configurações.');
  }

  if (carregando) {
    return (
      <View style={styles.container}>
        <Text style={styles.subtitulo}>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Configurações</Text>

      <Text style={{ marginTop: 20, marginBottom: 5, fontWeight: 'bold', color: '#333' }}>
        Capacidade máxima da caixa (litros)
      </Text>
      <TextInput
        value={capacidade}
        onChangeText={setCapacidade}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          padding: 10,
          fontSize: 16,
        }}
      />

      <Text style={{ marginTop: 20, marginBottom: 5, fontWeight: 'bold', color: '#333' }}>
        Alertar quando o nível estiver abaixo de (%)
      </Text>
      <TextInput
        value={limiteAlerta}
        onChangeText={setLimiteAlerta}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          borderRadius: 8,
          padding: 10,
          fontSize: 16,
        }}
      />

      <Pressable
        onPress={handleSalvar}
        style={{
          backgroundColor: '#007bff',
          padding: 14,
          borderRadius: 8,
          marginTop: 25,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>Salvar</Text>
      </Pressable>
    </View>
  );
}
