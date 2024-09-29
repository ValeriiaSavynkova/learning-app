const todayDate = (date = new Date()) => {
  const d = new Date(date);
  // Обнуляем время
  d.setHours(0, 0, 0, 0);
  // Возвращаем timestamp
  return d.getTime();
};

module.exports = { todayDate };
//console.log(todayDate());
