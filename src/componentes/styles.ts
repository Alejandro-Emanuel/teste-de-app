import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 16,
    justifyContent: 'center',
    gap: 10,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f172a',
    alignSelf: 'center',
    paddingTop: 50,
  },
  subtitulo: {
    fontSize: 14,
    lineHeight: 20,
    color: '#475569',
    marginBottom: 8,
    textAlign: 'center',
  },
  botaoSecundario: {
    borderWidth: 1,
    borderColor: '#00ABE4',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  botaoSecundarioTexto: {
    color: '#00ABE4',
    fontWeight: '700',
  },

  /* ==========================================================
     ESTILOS DO NOVO CARD DE MONITORAMENTO (PROFISSIONAL)
     ========================================================== */
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    // Sombra para iOS
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    // Sombra para Android
    elevation: 3,
    marginVertical: 12,
  },
  containerImagem: {
    flex: 4.5, // Controla a proporção do espaço para a imagem (esquerda)
    alignItems: 'center',
    justifyContent: 'center',
  },
  caixaDaguaImg: {
    width: '100%',
    aspectRatio: 1, // Torna a imagem perfeitamente quadrada e responsiva!
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
  },
  containerInformacoes: {
    flex: 5.5, // Controla a proporção do espaço para as colunas (direita)
    flexDirection: 'column',
    gap: 12,
  },
  blocoInfo: {
    padding: 12,
    borderRadius: 12,
    justifyContent: 'center',
  },
  blocoLitros: {
    backgroundColor: '#fef2f2', // Vermelho pastel premium
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444',
  },
  blocoVolume: {
    backgroundColor: '#f0fdf4', // Verde pastel premium
    borderLeftWidth: 4,
    borderLeftColor: '#22c55e',
  },
  rotuloInfo: {
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 2,
  },
  valorInfo: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
});