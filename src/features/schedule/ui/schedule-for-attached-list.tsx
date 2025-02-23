import moment from "moment";
import { querySchedule } from "~/entities/schedule/hooks/use-query-schedule";

const ScheduleForAttachedList = () => {
  const today = moment();
  const currentWeekStart = today.clone().startOf("week");
  const nextWeekEnd = today.clone().add(1, "week").endOf("week");

  const startDate = currentWeekStart.format("YYYY-MM-DD");
  const endDate = nextWeekEnd.format("YYYY-MM-DD");
  const {} = querySchedule.useGetSchedule({
    startDate,
    endDate,
  });
  return <div>ScheduleForAttachedList</div>;
};

export default ScheduleForAttachedList;
