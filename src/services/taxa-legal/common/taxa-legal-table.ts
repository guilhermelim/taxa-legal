/**
 * Interface que representa uma entrada da tabela de Taxa Legal mensal.
 */
export interface TaxaLegalEntry {
  year: number; // Ano da Taxa Legal
  month: number; // Mês da Taxa Legal
  value: number; // Valor da Taxa Legal para o mês/ano (em percentual)
}
