import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1D3A',
    padding: 16,
    justifyContent: 'center',
    gap: 10,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffff',
    alignSelf: 'center',
    paddingTop: 50,
  },
  subtitulo: {
    fontSize: 14,
    lineHeight: 20,
    color: '#a7a6a6',
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
  cardContainer: {
    flexDirection: 'row',
    backgroundColor: '#123368',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    elevation: 3,
    marginVertical: 12,
  },
containerImagem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  caixaDaguaImg: {
    width: 140,
    height: 150,
    borderRadius: 12,
    backgroundColor: '#f1f5f9',
  },
  containerInformacoes: {
    flex: 1,
    flexDirection: 'column',
    gap: 12,
  },
  blocoLitros: {
    backgroundColor: '#fef2f2', 
    borderLeftWidth: 4,
    borderLeftColor: '#ef4444',
  },
  blocoVolume: {
    backgroundColor: '#f0fdf4',
    borderLeftWidth: 4,
    borderLeftColor: '#22c55e',
  },
});