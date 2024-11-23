/**
 * Função para buscar os dados de correção na API do Banco Central
 * @param startDate Data inicial do período
 * @param endDate Data final do período
 * @param correctionValue Valor a ser corrigido
 * @returns Resposta da API em formato texto
 */
export async function fetchCorrectionData(
  startDate: string,
  endDate: string,
  correctionValue: string
): Promise<string> {
  const form = new FormData();
  form.append("aba", "6");
  form.append("dataInicial", startDate);
  form.append("dataFinal", endDate);
  form.append("valorCorrecao", correctionValue);

  const options = {
    method: "POST",
    body: form,
  };

  try {
    const response = await fetch(
      "https://www3.bcb.gov.br/CALCIDADAO/publico/corrigirPelaTaxaLegal.do?method=corrigirPelaTaxaLegal",
      options
    );
    return response.text();
  } catch (err) {
    throw new Error(`Erro ao buscar dados de correção: ${err}`);
  }
}
