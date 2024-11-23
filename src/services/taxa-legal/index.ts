import { TaxaLegalEntry } from "./common/taxa-legal-table";
import applyTaxaLegal from "./metodologia-padrao";
import applyTaxaLegalBC from "./bcb";

/**
 * Função de ponto de acesso para calcular a Taxa Legal com base na metodologia desejada.
 * @param startDate Data de início do período.
 * @param endDate Data final do período.
 * @param value Valor nominal a ser corrigido.
 * @param taxaLegalTable Tabela com a Taxa Legal mensal.
 * @param useBCB Método de cálculo usando a API do Banco Central (opcional).
 * @returns Objeto com os resultados do cálculo.
 */
export default async function calculateTaxaLegal(
  startDate: Date,
  endDate: Date,
  value: number,
  taxaLegalTable: TaxaLegalEntry[] = [],
  useBCB: boolean = false
) {
  if (useBCB) {
    // Usar a API do Banco Central
    return await applyTaxaLegalBC(startDate, endDate, value);
  } else {
    // Usar a metodologia padrão (calculando com a tabela fornecida ou a padrão)
    const result = await applyTaxaLegal(
      value,
      startDate,
      endDate,
      taxaLegalTable.length ? taxaLegalTable : getDefaultTaxaLegalTable() // Se não passar tabela, usa a padrão
    );
    return result;
  }
}

/**
 * Função para obter a tabela padrão da Taxa Legal (caso não seja fornecida).
 * @returns Tabela padrão da Taxa Legal.
 */
function getDefaultTaxaLegalTable(): TaxaLegalEntry[] {
  return [
    { year: 2024, month: 8, value: 0.605306 },
    { year: 2024, month: 9, value: 0.676227 },
    { year: 2024, month: 10, value: 0.704241 },
    { year: 2024, month: 11, value: 0.385874 },
  ];
}
