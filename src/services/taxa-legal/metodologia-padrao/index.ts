import { TaxaLegalEntry } from "../common/taxa-legal-table";
import getOverdueDays, { OverdueDays } from "./getOverdueDays";

/**
 * Interface de resultado do cálculo da Taxa Legal.
 */
interface CorrectionResult {
  indexCorrection: string;
  percentageValue: string;
  correctedValue: string;
}

/**
 * Função para calcular o valor corrigido usando a Metodologia Padrão (anteriormente CJR).
 * @param nominalValue - Valor nominal a ser corrigido.
 * @param startDate - Data inicial do período de inadimplência.
 * @param endDate - Data final do período de inadimplência.
 * @param taxaLegalTable - Tabela de Taxa Legal mensal (opcional).
 * @returns Valor corrigido, o índice de correção e o percentual de correção.
 */
export default function applyTaxaLegal(
  nominalValue: number,
  startDate: Date,
  endDate: Date,
  taxaLegalTable: TaxaLegalEntry[]
): CorrectionResult {
  // Utiliza a tabela fornecida ou a padrão
  const taxaLegal = taxaLegalTable;

  // Calcula os dias de inadimplência agrupados por ano/mês
  const overdueDays: OverdueDays[] = getOverdueDays(startDate, endDate);

  // Calcula a tabela da Taxa Legal diária
  const dailyTaxTable = taxaLegal.map(({ year, month, value }) => {
    const daysInMonth = new Date(year, month, 0).getDate();
    return {
      year,
      month,
      dailyValue: parseFloat((value / daysInMonth).toString()), // Taxa diária
    };
  });

  // Calcula o percentual total de juros aplicado
  let totalTaxPercentage = 0;
  for (const { year, month, daysOverdue } of overdueDays) {
    const dailyTax = dailyTaxTable.find(
      (tax) => tax.year === year && tax.month === month
    );
    if (dailyTax) {
      totalTaxPercentage += dailyTax.dailyValue * daysOverdue;
    }
  }

  // Calcula o valor corrigido
  const correctedValue = nominalValue * (1 + totalTaxPercentage / 100);

  // Retorna os resultados
  const indexCorrection = (totalTaxPercentage / 100).toFixed(8);
  const percentageValue = totalTaxPercentage.toFixed(6);

  return {
    indexCorrection,
    percentageValue,
    correctedValue: correctedValue.toFixed(2),
  };
}
