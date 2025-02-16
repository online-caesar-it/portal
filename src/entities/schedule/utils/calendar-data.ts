import moment from "moment";
import { Moment } from "moment";

export const generateCalendarData = (currentMonth: Moment) => {
  const data = [];
  const startDay = moment(currentMonth)
    .startOf("month")
    .startOf("week")
    .add(1, "days");
  const endDay = moment(currentMonth)
    .endOf("month")
    .endOf("week")
    .add(1, "days");
  for (let i = startDay; i <= endDay; i.add(1, "days")) {
    data.push({
      day: i.format("DD"),
      currentMonth: i.format("MMMM"),
      currentYear: i.format("YYYY"),
      dayOfWeek: startDay.format("dddd"),
    });
  }

  return data;
};
