import * as SQLite from 'expo-sqlite';

let database: SQLite.SQLiteDatabase | null = null;
const DATABASE_VERSION = 1;

async function configurarPragmas(db: SQLite.SQLiteDatabase): Promise<void> {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;
  `);
}

async function executarMigracaoV1(db: SQLite.SQLiteDatabase): Promise<void> {
  await db.execAsync(`
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

    CREATE INDEX IF NOT EXISTS idx_notificacoes_criado_em ON notificacoes(criado_em);
    CREATE INDEX IF NOT EXISTS idx_agua_criado_em ON agua(criado_em);

    DROP TRIGGER IF EXISTS gerar_alerta_nivel_baixo;
    
    CREATE TRIGGER IF NOT EXISTS auto_limpar_notificacoes_antigas
    AFTER INSERT ON notificacoes
    BEGIN
      DELETE FROM notificacoes WHERE criado_em < DATETIME('now', '-30 days');
    END;
  `);
}

export async function getDb(): Promise<SQLite.SQLiteDatabase> {
  if (database) {
    return database;
  }

  try {
    database = await SQLite.openDatabaseAsync('agua.db');
    await configurarPragmas(database);

    const resultadoVersao = await database.getFirstAsync<{ user_version: number }>(
      'PRAGMA user_version;'
    );
    
    const versaoAtual = resultadoVersao?.user_version ?? 0;

    if (versaoAtual < DATABASE_VERSION) {
      if (versaoAtual === 0) {
        await executarMigracaoV1(database);
      }
      
      await database.execAsync(`PRAGMA user_version = ${DATABASE_VERSION};`);
    }

    return database;
  } catch (error) {
    console.error('[Database] Erro:', error);
    throw new Error('Não foi possível conectar ao banco de dados local.');
  }
}