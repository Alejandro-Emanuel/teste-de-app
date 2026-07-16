import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1D3A",
    padding: 16,
    justifyContent: "center",
    gap: 10,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "700",
    color: "#ffff",
    alignSelf: "center",
    paddingTop: 50,
  },
  subtitulo: {
    fontSize: 14,
    lineHeight: 20,
    color: "#a7a6a6",
    marginBottom: 8,
    textAlign: "center",
  },
  botaoSecundario: {
    borderWidth: 1,
    borderColor: "#00ABE4",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 20,
  },
  botaoSecundarioTexto: {
    color: "#00ABE4",
    fontWeight: "700",
  },
  cardContainer: {
    flexDirection: "row",
    backgroundColor: "#123368",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
    elevation: 3,
    marginVertical: 12,
  },
  statCard: {
    backgroundColor: "#123368",
    borderRadius: 12,
    padding: 16,
  },
  statCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  statCardTitulo: {
    fontSize: 11,
    fontWeight: "500",
    color: "rgba(255,255,255,0.45)",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  statBadge: {
    backgroundColor: "rgba(0,171,228,0.12)",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  statBadgeTexto: {
    fontSize: 11,
    fontWeight: "500",
    color: "#00ABE4",
  },
  statRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },
  statBloco: {
    flex: 1,
    gap: 3,
  },
  statLabel: {
    fontSize: 11,
    color: "rgba(255,255,255,0.4)",
  },
  statValor: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
  },
  statUnidade: {
    fontSize: 11,
    color: "rgba(255,255,255,0.35)",
    fontWeight: "400",
  },
  containerImagem: {
    width: 100,
    height: 100,
    borderRadius: 8,
    overflow: "hidden",
  },
  caixaDaguaImg: {
    width: "100%",
    height: "100%",
  },
  containerInformacoes: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    gap: 8,
    paddingLeft: 12,
  },
  blocoInfo: {
    flex: 1,
    justifyContent: "center",
  },
  blocoLitros: {
    borderBottomWidth: 0.5,
    borderBottomColor: "rgba(255,255,255,0.08)",
    paddingBottom: 8,
  },
  blocoVolume: {
    paddingTop: 8,
  },
  rotuloInfo: {
    fontSize: 11,
    color: "rgba(255,255,255,0.4)",
  },
  valorInfo: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
  },
  configCard: {
    backgroundColor: "#123368",
    borderRadius: 16,
    padding: 20,
    gap: 20,
  },
  campoGrupo: {
    gap: 8,
  },
  campoLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "rgba(255,255,255,0.65)",
  },
  campoAjuda: {
    fontSize: 11,
    color: "rgba(255,255,255,0.4)",
    marginTop: -4,
  },
  campoInput: {
    backgroundColor: "#0B1D3A",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    color: "#fff",
  },
  botaoPrimario: {
    backgroundColor: "#00ABE4",
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 4,
  },
  botaoPrimarioPressionado: {
    opacity: 0.8,
  },
  botaoPrimarioTexto: {
    color: "#0B1D3A",
    fontWeight: "700",
    fontSize: 16,
  },
  seletorFormato: {
    flexDirection: "row",
    gap: 10,
  },
  opcaoFormato: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    backgroundColor: "#0B1D3A",
    alignItems: "center",
  },
  opcaoFormatoSelecionada: {
    borderColor: "#00ABE4",
    backgroundColor: "rgba(0,171,228,0.15)",
  },
  opcaoFormatoTexto: {
    color: "rgba(255,255,255,0.6)",
    fontWeight: "600",
  },
  opcaoFormatoTextoSelecionado: {
    color: "#00ABE4",
  },
});
