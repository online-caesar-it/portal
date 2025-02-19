import moment from "moment";
import { Moment } from "moment";
export type TCalendarData = {
  day: string;
  currentMonth: string;
  currentYear: string;
  dayOfWeek: string;
  isoWeekday: number;
  isCurrentMonth: boolean;
};
export const generateCalendarData = (currentMonth: Moment) => {
  const data: TCalendarData[] = [];

  // Начинаем с первого дня месяца
  const startDay = moment(currentMonth).startOf("month").startOf("isoWeek");
  const endDay = moment(currentMonth).endOf("month").endOf("isoWeek");

  for (let i = startDay; i.isBefore(endDay); i.add(1, "days")) {
    // Проверяем, что день принадлежит текущему месяцу
    const isCurrentMonth = i.month() === currentMonth.month();
    data.push({
      day: i.format("DD"),
      currentMonth: i.format("MMMM"),
      currentYear: i.format("YYYY"),
      dayOfWeek: i.format("dddd"),
      isoWeekday: i.isoWeekday(),
      isCurrentMonth, // добавляем флаг текущего месяца
    });
  }

  return data;
};
