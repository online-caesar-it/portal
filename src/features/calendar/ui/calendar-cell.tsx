import { GridCol } from "@mantine/core";
import moment from "moment";
import { twMerge } from "tailwind-merge";
import { EScheduleStatus } from "~/shared/enums/schedule-enum";
import { TSchedule } from "~/shared/types/schedule-type";

const CalendarCell = ({
  day,
  currentMonth,
  weekDay,
  handleClick,
  schedules,
}: {
  day: string;
  currentMonth: string;
  weekDay: number;
  handleClick: (schedule: TSchedule) => void;
  schedules: TSchedule[];
}) => {
  const date = moment(
    `${currentMonth} ${day} ${moment().year()}`,
    "MMMM DD YYYY"
  ).startOf("day");

  const isWeekend = weekDay === 6 || weekDay === 7;
  const isToday = date.isSame(moment(), "day");

  const findSchedules = schedules.find((it) =>
    moment(it.dateLesson).startOf("day").isSame(date)
  );

  return (
    <GridCol span={1}>
      <div
        onClick={() => findSchedules && handleClick(findSchedules)}
        className={twMerge(
          "flex items-center cursor-pointer justify-center  h-16 p-2 rounded-md transition-all",
          "border border-gray-400 text-gray-100",
          isToday && "bg-blue-500 text-white font-bold",
          isWeekend && "text-white opacity-50",
          findSchedules &&
            findSchedules.status === EScheduleStatus.SCHEDULED &&
            "bg-emerald-800 text-emerald-400 opacity-100"
        )}
      >
        {day}
      </div>
    </GridCol>
  );
};

export default CalendarCell;
