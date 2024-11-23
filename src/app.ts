import calculateTaxaLegal from "./services/taxa-legal";
import { dateToString } from "./services/taxa-legal/common/date.util";
import { TaxaLegalEntry } from "./services/taxa-legal/common/taxa-legal-table";

// Exemplo de tabela de Taxa Legal para ser utilizada caso o usuário não forneça uma tabela personalizada
const defaultTaxaLegalTable: TaxaLegalEntry[] = [
  { year: 2024, month: 8, value: 0.605306 },
  { year: 2024, month: 9, value: 0.676227 },
  { year: 2024, month: 10, value: 0.704241 },
  { year: 2024, month: 11, value: 0.385874 },
];

async function runTest() {
  const startDate = new Date(2024, 7, 30);
  const endDate = new Date(2024, 10, 30);
  const amount = 1000.0;

  console.log("Iniciando os testes...");

  const results = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    const testDate = new Date(currentDate); // Clona a data atual

    try {
      const resultBC = await calculateTaxaLegal(
        testDate,
        endDate,
        amount,
        defaultTaxaLegalTable,
        true
      );
      const resultCJR = await calculateTaxaLegal(
        testDate,
        endDate,
        amount,
        defaultTaxaLegalTable,
        false
      );

      // Calcula os valores corrigidos para a data atual
      console.log(
        `Testando data: ${dateToString(testDate)} para ${dateToString(
          endDate
        )} - ${
          resultBC.correctedValue !== resultCJR.correctedValue
            ? "❌ Errado"
            : "✅ Correto"
        }`
      );

      // Verifica se os valores corrigidos diferem
      if (
        resultBC.correctedValue !== resultCJR.correctedValue &&
        resultBC.percentageValue !== resultCJR.percentageValue &&
        resultBC.indexCorrection !== resultCJR.indexCorrection
      ) {
        results.push({
          startDate: dateToString(testDate),
          endDate: dateToString(endDate),
          correctedValueBC: resultBC.correctedValue,
          correctedValueCJR: resultCJR.correctedValue,
          difference: (
            Number(resultCJR.correctedValue) - Number(resultBC.correctedValue)
          ).toFixed(2),
        });
      }
    } catch (error) {
      console.error(
        `Erro ao testar para data ${dateToString(testDate)}:`,
        error
      );
    }

    // Incrementa para o próximo dia
    currentDate.setDate(currentDate.getDate() + 1);
  }

  if (results.length) {
    console.log("\nResultados de valores divergentes:");
    console.table(results);
  } else {
    console.log("✅ Nenhum valor divergente");
  }
}

(async () => {
  const startDate = new Date(2024, 7, 30);
  const endDate = new Date(2024, 8, 10);
  const amount = 1000.0;

  // await runTest();

  console.log("Iniciando o cálculo da Taxa Legal...");

  try {
    // Cálculo usando a API do Banco Central
    const resultBCB = await calculateTaxaLegal(
      startDate,
      endDate,
      amount,
      [],
      true
    );
    console.log("\nResultado usando API Banco Central (BCB):", resultBCB);

    // Cálculo usando a Metodologia Padrão (com a tabela fornecida ou a padrão)
    const resultPadrao = await calculateTaxaLegal(
      startDate,
      endDate,
      amount,
      defaultTaxaLegalTable,
      false
    );
    console.log("\nResultado usando a Metodologia Padrão:", resultPadrao);
  } catch (error) {
    console.error("Erro ao calcular a Taxa Legal:", error);
  }
})();
