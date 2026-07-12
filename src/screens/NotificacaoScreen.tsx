import { useEffect, useState } from 'react';
import { FlatList, Text, View, Pressable } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { 
  buscarNotificacoes, 
  marcarComoLida, 
  excluirNotificacao, 
  limparTodasNotificacoes, 
  Notificacao 
} from '../database/notificacaoService';
import { styles } from '../styles';

export function NotificacoesScreen() {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const isFocused = useIsFocused();

  async function carregarNotificacoes() {
    const dados = await buscarNotificacoes();
    setNotificacoes(dados);
  }

  useEffect(() => {
    if (isFocused) {
      carregarNotificacoes();
    }
  }, [isFocused]);

  async function handleMarcarLida(id: number) {
    await marcarComoLida(id);
    carregarNotificacoes();
  }

  async function handleExcluir(id: number) {
    await excluirNotificacao(id);
    carregarNotificacoes();
  }

  async function handleLimparTudo() {
    await limparTodasNotificacoes();
    setNotificacoes([]);
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
        <Text style={styles.titulo}>Histórico de Alertas</Text>
        {notificacoes.length > 0 && (
          <Pressable onPress={handleLimparTudo} style={{ backgroundColor: '#ff4d4d', padding: 8, borderRadius: 5 }}>
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Limpar Tudo</Text>
          </Pressable>
        )}
      </View>

      {notificacoes.length === 0 ? (
        <Text style={styles.subtitulo}>Nenhuma notificação encontrada no momento.</Text>
      ) : (
        <FlatList
          data={notificacoes}
          keyExtractor={(item) => item.id_notificacao!.toString()}
          renderItem={({ item }) => (
            <View style={{
              backgroundColor: item.lida === 0 ? '#e6f2ff' : '#f9f9f9',
              padding: 15,
              borderRadius: 8,
              marginBottom: 10,
              borderWidth: 1,
              borderColor: item.lida === 0 ? '#b3d7ff' : '#e0e0e0'
            }}>
              <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#333' }}>{item.titulo}</Text>
              <Text style={{ marginVertical: 5, color: '#666' }}>{item.mensagem}</Text>
              
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 15, marginTop: 5 }}>
                {item.lida === 0 && (
                  <Pressable onPress={() => handleMarcarLida(item.id_notificacao!)}>
                    <Text style={{ color: '#007bff', fontWeight: 'bold' }}>Marcar como lida</Text>
                  </Pressable>
                )}
                <Pressable onPress={() => handleExcluir(item.id_notificacao!)}>
                  <Text style={{ color: '#dc3545', fontWeight: 'bold' }}>Excluir</Text>
                </Pressable>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}