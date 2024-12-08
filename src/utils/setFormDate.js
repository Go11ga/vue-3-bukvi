const setFormDate = (date) => {
  const timestamp = new Date(date.seconds) * 1000;

  const dateObj = new Date(timestamp);

  const year = dateObj.getFullYear();
  const month = dateObj.getMonth();
  const day = dateObj.getDate();

  let offset = new Date().getTimezoneOffset();
  offset = -offset / 60;

  return new Date(year, month, day, offset, 0, 0).toISOString().slice(0, 16);
};

export default setFormDate;
