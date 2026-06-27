import { obterBanco } from './database';

export interface Notificacao {
  id?: number;
  titulo: string;
  mensagem: string;
  data: string;
  tipo: 'alerta' | 'sucesso' | 'info';
  lida?: number;
}

export const Notificação = {
  async salvar(notificacao: Notificacao) {
    const db = await obterBanco();
    const resultado = await db.runAsync(
      'INSERT INTO notificacoes (titulo, mensagem, data, tipo) VALUES (?, ?, ?, ?);',
      [notificacao.titulo, notificacao.mensagem, notificacao.data, notificacao.tipo]
    );
    return resultado.lastInsertRowId;
  },

  async listarTodas(): Promise<Notificacao[]> {
    const db = await obterBanco();
    const todas = await db.getAllAsync<Notificacao>('SELECT * FROM notificacoes ORDER BY id DESC;');
    return todas;
  },

  async deletar(id: number) {
    const db = await obterBanco();
    await db.runAsync('DELETE FROM notificacoes WHERE id = ?;', [id]);
  }
};