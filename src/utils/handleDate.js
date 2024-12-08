/**
 * Обработка даты
 * @param { String } date - дата из поля date Firebase: { nanoseconds : 669000000, seconds : 1664190000 }
 * @returns { String } - дата в формате: 3 Сентября, 2022
 */
const handleDate = (date) => {
  const timestamp = new Date(date.seconds) * 1000;

  const dateObj = new Date(timestamp);

  const year = dateObj.getFullYear();
  const month = dateObj.getMonth();
  const day = dateObj.getDate();

  const months = [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря',
  ];

  return `${day} ${months[month]}, ${year}`;
};

export default handleDate;
