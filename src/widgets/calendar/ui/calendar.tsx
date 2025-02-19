import { useState } from "react";
import moment from "moment";
import { Card, Grid, Text } from "@mantine/core";
import CalendarController from "~/features/calendar/ui/calendar-controller";
import List from "~/shared/lib/components/list";
import CalendarCell from "~/features/calendar/ui/calendar-cell";
import { generateCalendarData } from "~/entities/schedule/utils/calendar-data";
import { querySchedule } from "~/entities/schedule/hooks/use-query-schedule";
import { TSchedule } from "~/shared/types/schedule-type";
const daysName = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const Calendar = ({
  handleClick,
}: {
  handleClick: (schedule: TSchedule) => void;
}) => {
  const [currentMonth, setCurrentMonth] = useState(moment());
  const months = generateCalendarData(currentMonth);
  const startDate = currentMonth
    .clone()
    .startOf("month")
    .startOf("week")
    .format("YYYY-MM-DD");
  const endDate = currentMonth
    .clone()
    .endOf("month")
    .endOf("week")
    .format("YYYY-MM-DD");
  const { data } = querySchedule.useGetSchedule({
    startDate,
    endDate,
  });
  console.log(months);
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Grid justify="space-between" align="center" mb="md">
        <CalendarController
          prevMonth={() =>
            setCurrentMonth((prev) => prev.clone().subtract(1, "month"))
          }
          nextMonth={() =>
            setCurrentMonth((prev) => prev.clone().add(1, "month"))
          }
          currentMonth={currentMonth}
        />
      </Grid>
      <Grid columns={7} gutter="xs">
        <List list={daysName}>
          {(day) => (
            <Grid.Col span={1}>
              <Text>{day}</Text>
            </Grid.Col>
          )}
        </List>
        <List list={months}>
          {({ day, isoWeekday, currentMonth }) => (
            <CalendarCell
              schedules={data ?? []}
              handleClick={(schedule) => handleClick(schedule)}
              currentMonth={currentMonth}
              day={day}
              weekDay={isoWeekday}
            />
          )}
        </List>
      </Grid>
    </Card>
  );
};

export default Calendar;
