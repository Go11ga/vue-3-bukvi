/**
 * Обработка даты для ApexCharts
 * @param { String } date - дата из поля date Firebase: { nanoseconds : 669000000, seconds : 1664190000 }
 * @returns { String } - дата в формате: 03/09/2022
 */
const handleChartDate = (date) => {
  const timestamp = new Date(date.seconds) * 1000;

  const dateObj = new Date(timestamp);

  const year = dateObj.getFullYear();

  let month = dateObj.getMonth();
  month += 1;

  const day = dateObj.getDate();

  return `${year}-${month}-${day}`;
};

export default handleChartDate;
