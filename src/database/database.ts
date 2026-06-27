import * as SQLite from 'expo-sqlite';

let database: SQLite.SQLiteDatabase | null = null;

export async function getDb() {
  if (database) {
    return database;
  }

  database = await SQLite.openDatabaseAsync(
    'aqua.db'
  );

  await database.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS notificacoes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      mensagem TEXT NOT NULL,
      data TEXT NOT NULL,
      tipo TEXT NOT NULL,
      lida INTEGER NOT NULL DEFAULT 0
    );
  `);

  return database;
}