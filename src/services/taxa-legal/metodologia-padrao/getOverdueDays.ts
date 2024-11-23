export interface OverdueDays {
  year: number;
  month: number;
  daysOverdue: number;
}

/**
 * Função que calcula os dias de atraso entre as duas datas fornecidas, agrupados por ano e mês.
 * @param startDate - Data de início do período de inadimplência.
 * @param endDate - Data final do período de inadimplência.
 * @returns Uma lista com os dias de atraso por ano e mês.
 */
export default function getOverdueDays(
  startDate: Date,
  endDate: Date
): OverdueDays[] {
  const overdueDays: OverdueDays[] = [];

  let currentDate = new Date(startDate);
  currentDate.setDate(currentDate.getDate()); // Começa no dia seguinte à data de vencimento

  while (currentDate < endDate) {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Meses são baseados em zero

    // Verifica se já existe uma entrada para o ano e mês atual
    let daysInMonth = overdueDays.find(
      (d) => d.year === year && d.month === month
    );
    if (!daysInMonth) {
      daysInMonth = { year, month, daysOverdue: 0 };
      overdueDays.push(daysInMonth);
    }

    // Incrementa o contador de dias de atraso
    daysInMonth.daysOverdue++;

    // Avança para o próximo dia
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return overdueDays;
}
