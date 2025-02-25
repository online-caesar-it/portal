import moment from "moment";
import { querySchedule } from "./use-query-schedule";
import { TSchedule } from "~/shared/types/schedule-type";

export const useGroupScheduleByDate = () => {
  const today = moment();
  const currentWeekStart = today.clone().startOf("week");
  const nextWeekEnd = today.clone().add(1, "week").endOf("week");

  const startDate = currentWeekStart.format("YYYY-MM-DD");
  const endDate = nextWeekEnd.format("YYYY-MM-DD");
  const { data } = querySchedule.useGetSchedule({
    startDate,
    endDate,
  });
  const groupedData = data?.reduce(
    (acc: { [date: string]: TSchedule[] }, schedule) => {
      if (!schedule.dateLesson) return acc;
      const date = moment(schedule.dateLesson).format("YYYY-MM-DD");
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(schedule);
      return acc;
    },
    {}
  );
  return { data, currentWeekStart, nextWeekEnd, groupedData };
};
