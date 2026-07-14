import { useEffect, useState } from 'react';
import { Text, TextInput, View, Pressable, Alert, ScrollView } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { buscarConfiguracao, atualizarConfiguracao } from '../database/configuracaoService';
import { publicarCapacidade } from '../MQTT/MqttService';
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
    if (sucesso) publicarCapacidade(capacidadeNum);

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
    <ScrollView
      style={{ flex: 1, backgroundColor: '#0B1D3A' }}
      contentContainerStyle={{ padding: 16, paddingBottom: 40 }}
    >
      <Text style={styles.titulo}>Configurações</Text>
      <Text style={styles.subtitulo}>Ajuste os parâmetros da caixa d'água</Text>

      <View style={styles.configCard}>
        <View style={styles.campoGrupo}>
          <Text style={styles.campoLabel}>Capacidade máxima da caixa (litros)</Text>
          <TextInput
            value={capacidade}
            onChangeText={setCapacidade}
            keyboardType="numeric"
            placeholder="Ex: 1000"
            placeholderTextColor="rgba(255,255,255,0.3)"
            style={styles.campoInput}
          />
          <Text style={styles.campoAjuda}>Enviado automaticamente para o dispositivo ao salvar.</Text>
        </View>

        <View style={styles.campoGrupo}>
          <Text style={styles.campoLabel}>Alertar quando o nível estiver abaixo de (%)</Text>
          <TextInput
            value={limiteAlerta}
            onChangeText={setLimiteAlerta}
            keyboardType="numeric"
            placeholder="Ex: 20"
            placeholderTextColor="rgba(255,255,255,0.3)"
            style={styles.campoInput}
          />
        </View>

        <Pressable
          onPress={handleSalvar}
          style={({ pressed }) => [styles.botaoPrimario, pressed && styles.botaoPrimarioPressionado]}
        >
          <Text style={styles.botaoPrimarioTexto}>Salvar</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
