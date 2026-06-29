import * as SQLite from 'expo-sqlite';

let database: SQLite.SQLiteDatabase | null = null;

export async function getDb() {
  if (database) {
    return database;
  }

  database = await SQLite.openDatabaseAsync('agua.db');

  await database.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS agua (
      id_agua INTEGER PRIMARY KEY AUTOINCREMENT,
      litros_atuais INTEGER NOT NULL,
      volume_percentual INTEGER NOT NULL,
      para_completar_percentual INTEGER NOT NULL,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS notificacoes (
      id_notificacao INTEGER PRIMARY KEY AUTOINCREMENT,
      titulo TEXT NOT NULL,
      mensagem TEXT NOT NULL,
      lida INTEGER DEFAULT 0,
      criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS configuracoes (
      id_config INTEGER PRIMARY KEY AUTOINCREMENT,
      capacidade_maxima_litros INTEGER DEFAULT 1000,
      limite_alerta_minimo INTEGER DEFAULT 20
    );

    CREATE TABLE IF NOT EXISTS consumo_diario (
      id_consumo INTEGER PRIMARY KEY AUTOINCREMENT,
      data_registro TEXT UNIQUE NOT NULL,
      litros_consumidos INTEGER NOT NULL
    );
  `);

  await database.execAsync(`
    CREATE TRIGGER IF NOT EXISTS gerar_alerta_nivel_baixo
    AFTER INSERT ON agua
    WHEN NEW.volume_percentual <= 20
    BEGIN
      INSERT INTO notificacoes (titulo, mensagem)
      VALUES (
        'Nível Crítico!', 
        'Sua caixa d''água está com apenas ' || NEW.volume_percentual || '%. Verifique se há vazamentos ou interrupção no abastecimento.'
      );
    END;

    CREATE TRIGGER IF NOT EXISTS auto_limpar_notificacoes_antigas
    AFTER INSERT ON notificacoes
    BEGIN
      DELETE FROM notificacoes WHERE criado_em < DATETIME('now', '-30 days');
    END;
  `);

  return database;
}