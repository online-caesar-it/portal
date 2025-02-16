import { useState } from "react";
import moment from "moment";
import { Card, Grid, Text } from "@mantine/core";
import CalendarController from "~/features/calendar/ui/calendar-controller";
import List from "~/shared/lib/components/list";
import CalendarCell from "~/features/calendar/ui/calendar-cell";
import { generateCalendarData } from "~/entities/schedule/utils/calendar-data";
const daysName = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(moment());
  const months = generateCalendarData(currentMonth);
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
          {({ day }) => <CalendarCell currentMonth={currentMonth} day={day} />}
        </List>
      </Grid>
    </Card>
  );
};

export default Calendar;
