/**
 * Função para fazer o parsing dos valores da resposta da API do Banco Central
 * @param htmlContent Resposta da API em formato HTML
 * @returns Um objeto com os valores de correção
 */
export function parseCorrectionValues(htmlContent: string) {
  // Expressão regular para capturar os valores de índice, percentual e valor corrigido
  const regex =
    /(?<="fundoPadraoAClaro3 "[\s\S]*?>\s*)(?:R\$ )?(\d{1,3}(?:\.\d{3})*(?:,\d+)?)(?=[\s\S]*?<)/g;

  const matches = [...htmlContent.matchAll(regex)].map(
    (match) => match[1] || match[2]
  );

  if (matches.length < 3) {
    throw new Error(
      "Falha ao extrair todos os valores necessários da resposta HTML."
    );
  }

  return {
    indexCorrection: convertToNumber(matches[3]).toFixed(8),
    percentageValue: convertToNumber(matches[4]).toFixed(6),
    correctedValue: convertToNumber(matches[5]).toFixed(2),
  };
}

/**
 * Converte um valor de string para número
 * @param value Valor em formato string
 * @returns Valor numérico
 */
function convertToNumber(value: string): number {
  return parseFloat(value.replace(/\./g, "").replace(",", "."));
}
