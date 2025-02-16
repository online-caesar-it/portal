import { Button, Text } from "@mantine/core";
import { Moment } from "moment";

const CalendarController = ({
  prevMonth,
  nextMonth,
  currentMonth,
}: {
  prevMonth: () => void;
  nextMonth: () => void;
  currentMonth: Moment;
}) => {
  return (
    <>
      <Button onClick={prevMonth}>Предыдущий месяц</Button>
      <Text size="lg">{currentMonth.locale("ru").format("MMMM YYYY")}</Text>
      <Button onClick={nextMonth}>Следующий месяц</Button>
    </>
  );
};

export default CalendarController;
