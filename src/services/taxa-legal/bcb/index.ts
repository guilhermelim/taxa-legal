import { fetchCorrectionData } from "./fetchCorrectionData";
import { parseCorrectionValues } from "./parseCorrectionValues";
import { dateToString } from "../common/date.util";

interface CorrectionResult {
  indexCorrection: string;
  percentageValue: string;
  correctedValue: string;
}

/**
 * Função principal para calcular a Taxa Legal usando a API do Banco Central
 * @param startDate Data inicial do período inadimplente
 * @param endDate Data final do período inadimplente
 * @param correctionValue Valor a ser corrigido
 * @returns Resultados da correção
 */
export default async function applyTaxaLegalBC(
  startDate: Date | string,
  endDate: Date | string,
  correctionValue: number
): Promise<CorrectionResult> {
  // Converte as datas para o formato string no padrão DD/MM/YYYY, caso sejam passadas como objetos Date
  const startDateStr =
    typeof startDate === "string" ? startDate : dateToString(startDate);
  const endDateStr =
    typeof endDate === "string" ? endDate : dateToString(endDate);

  // Obtém os dados da correção usando a API do Banco Central
  const htmlContent = await fetchCorrectionData(
    startDateStr,
    endDateStr,
    correctionValue.toFixed(2).replace(".", ",")
  );

  // Parseia os valores da resposta da API
  return parseCorrectionValues(htmlContent);
}
