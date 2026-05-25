import { StyleSheet } from 'react-native';
import { red } from 'react-native-reanimated/lib/typescript/Colors';

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
  containerCaixa:{
    padding: 16,
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    gap: 20,
    justifyContent: 'space-between',
  },
  caixaDaguaImg: {
    width: '50%',
    height: 150,
    flex: 5,
  },
  containerInformacoes:{
    flex: 1,
    flexDirection: 'column',
  },
  litros:{
    width: '50%',
    flex: 1,
    backgroundColor: 'red',
    height: 100,
  },
  volume:{
    width: '50%',
    flex: 1,
    backgroundColor: 'green',
    height: 100,
  },

});