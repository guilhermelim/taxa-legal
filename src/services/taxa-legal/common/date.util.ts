/**
 * Converte uma string no formato DD/MM/YYYY para um objeto Date.
 * @param dateStr - A string representando a data (exemplo: "30/08/2024").
 * @returns Uma instância de Date.
 */
export function stringToDate(dateStr: string): Date {
  const [day, month, year] = dateStr.split("/").map((num) => parseInt(num, 10));
  // O mês é ajustado para zero-index (0 = janeiro, 1 = fevereiro, etc.)
  return new Date(year, month - 1, day);
}

/**
 * Converte uma instância de Date para uma string no formato DD/MM/YYYY.
 * @param date - A data que será formatada.
 * @returns Uma string representando a data no formato DD/MM/YYYY.
 */
export function dateToString(date: Date): string {
  // Certifique-se de que a data é representada corretamente no fuso horário local.
  const localDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

  const day = localDate.getDate().toString().padStart(2, "0");
  const month = (localDate.getMonth() + 1).toString().padStart(2, "0");
  const year = localDate.getFullYear();

  return `${day}/${month}/${year}`;
}
