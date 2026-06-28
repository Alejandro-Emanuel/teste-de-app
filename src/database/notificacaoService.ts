import { getDb } from './database';

export interface Notificacao {
  id_notificacao?: number;
  titulo: string;
  mensagem: string;
  lida: number;
  criado_em?: string;
}

export async function salvarNotificacao(titulo: string, mensagem: string): Promise<boolean> {

  if (!titulo.trim() || !mensagem.trim()) {
    console.warn('Aviso: Tentativa de salvar uma notificação com título ou mensagem vazia.');
    return false;
  }

  try {
    const db = await getDb();
    
    await db.runAsync(
      'INSERT INTO notificacoes (titulo, mensagem, lida) VALUES (?, ?, 0);',
      [titulo.trim(), mensagem.trim()]
    );
    
    return true;
  } catch (error) {
    console.error('Erro ao salvar notificação no SQLite:', error);
    return false;
  }
}

export async function buscarNotificacoes(): Promise<Notificacao[]> {
  try {
    const db = await getDb();
    
    return await db.getAllAsync<Notificacao>(
      'SELECT * FROM notificacoes ORDER BY criado_em DESC;'
    );
  } catch (error) {
    console.error('Erro ao buscar notificações no SQLite:', error);
    return [];
  }
}

export async function marcarComoLida(id_notificacao: number): Promise<boolean> {
  try {
    const db = await getDb();
    
    await db.runAsync(
      'UPDATE notificacoes SET lida = 1 WHERE id_notificacao = ?;',
      [id_notificacao]
    );
    
    return true;
  } catch (error) {
    console.error(`Erro ao marcar notificação ${id_notificacao} como lida:`, error);
    return false;
  }
}

export async function excluirNotificacao(id_notificacao: number): Promise<boolean> {
  try {
    const db = await getDb();
    
    await db.runAsync(
      'DELETE FROM notificacoes WHERE id_notificacao = ?;',
      [id_notificacao]
    );
    
    return true;
  } catch (error) {
    console.error(`Erro ao excluir notificação ${id_notificacao}:`, error);
    return false;
  }
}

export async function limparTodasNotificacoes(): Promise<boolean> {
  try {
    const db = await getDb();
    
    await db.runAsync('DELETE FROM notificacoes;');
    return true;
  } catch (error) {
    console.error('Erro ao limpar histórico de notificações:', error);
    return false;
  }
}