import moment from "moment";
import { Moment } from "moment";
export type TCalendarData = {
  day: string;
  currentMonth: string;
  currentYear: string;
  dayOfWeek: string;
  isoWeekday: number;
};
export const generateCalendarData = (currentMonth: Moment) => {
  const data: TCalendarData[] = [];

  const startDay = moment(currentMonth).startOf("month").startOf("isoWeek");
  const endDay = moment(currentMonth).endOf("month").endOf("isoWeek");

  for (let i = startDay; i.isBefore(endDay); i.add(1, "days")) {
    data.push({
      day: i.format("DD"),
      currentMonth: i.format("MMMM"),
      currentYear: i.format("YYYY"),
      dayOfWeek: i.format("dddd"),
      isoWeekday: i.isoWeekday(),
    });
  }

  return data;
};
