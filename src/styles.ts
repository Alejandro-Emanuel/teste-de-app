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
  },
  subtitulo: {
    fontSize: 14,
    lineHeight: 20,
    color: '#475569',
    marginBottom: 8,
  },
  botaoPrimario: {
    marginTop: 8,
    backgroundColor: '#00ABE4',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  botaoPrimarioTexto: {
    color: '#ffffff',
    fontWeight: '700',
  },
  botaoSecundario: {
    borderWidth: 1,
    borderColor: '#00ABE4',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  botaoSecundarioTexto: {
    color: '#00ABE4',
    fontWeight: '700',
  },
});