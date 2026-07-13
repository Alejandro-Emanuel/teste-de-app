import { getDb } from './database';

export interface Configuracao {
  id_config: number;
  capacidade_maxima_litros: number;
  limite_alerta_minimo: number;
}

/**
 * Cópia em memória do limite de alerta, sempre atualizada por buscarConfiguracao()
 * e atualizarConfiguracao(). Quem precisa do valor "ao vivo" (ex: CaixaContext)
 * pode importar e ler essa variável diretamente, sem precisar reabrir o app.
 */
export let limiteAlertaEmMemoria = 20;

/**
 * Garante que exista uma linha de configuração e a retorna.
 * A tabela `configuracoes` foi desenhada para ter no máximo 1 registro (singleton).
 */
export async function buscarConfiguracao(): Promise<Configuracao> {
  const db = await getDb();

  const existente = await db.getFirstAsync<Configuracao>(
    'SELECT * FROM configuracoes ORDER BY id_config LIMIT 1;'
  );

  if (existente) {
    limiteAlertaEmMemoria = existente.limite_alerta_minimo;
    return existente;
  }

  await db.runAsync(
    'INSERT INTO configuracoes (capacidade_maxima_litros, limite_alerta_minimo) VALUES (1000, 20);'
  );

  const criada = (await db.getFirstAsync<Configuracao>(
    'SELECT * FROM configuracoes ORDER BY id_config LIMIT 1;'
  ))!;
  limiteAlertaEmMemoria = criada.limite_alerta_minimo;
  return criada;
}

export async function atualizarConfiguracao(
  capacidadeMaximaLitros: number,
  limiteAlertaMinimo: number
): Promise<boolean> {
  try {
    const db = await getDb();
    const config = await buscarConfiguracao();

    await db.runAsync(
      'UPDATE configuracoes SET capacidade_maxima_litros = ?, limite_alerta_minimo = ? WHERE id_config = ?;',
      [capacidadeMaximaLitros, limiteAlertaMinimo, config.id_config]
    );

    limiteAlertaEmMemoria = limiteAlertaMinimo;
    return true;
  } catch (error) {
    console.error('Erro ao atualizar configuração:', error);
    return false;
  }
}
