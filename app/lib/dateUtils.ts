export const getDateString = (date: Date) => {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getNDaysBefore = (date: Date, n: number) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() - n);
  return newDate;
};

export const getThisMonday = () => {
  const date = new Date();
  date.setDate(date.getDate() - date.getDay() + 1);
  return date;
};

export const getPastMonday = () => {
  const date = new Date();
  date.setDate(date.getDate() - date.getDay() + 1 - 7);
  return date;
};

export const getPastSunday = () => {
  const date = new Date();
  date.setDate(date.getDate() - date.getDay());
  return date;
};

export const getThisFirstOfMonth = () => {
  const date = new Date();
  date.setDate(1);
  return date;
};

export const getPastFirstOfMonth = () => {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  date.setDate(1);
  return date;
};

export const getPastLastOfMonth = () => {
  const date = new Date();
  date.setMonth(date.getMonth() - 1);
  const daysInMonth = new Date(date.getFullYear(), date.getMonth(), 0).getDate();
  date.setDate(daysInMonth);
  return date;
};
