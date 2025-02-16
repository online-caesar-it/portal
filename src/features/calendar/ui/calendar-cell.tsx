import { Card, Grid, Text } from "@mantine/core";
import { Moment } from "moment";

const CalendarCell = ({
  day,
  currentMonth,
}: {
  day: string;
  currentMonth: Moment;
}) => {
  console.log(currentMonth);
  return (
    <Grid.Col span={1}>
      <Card shadow="xs" padding="xs" radius="sm" withBorder>
        <Text size="sm">{day}</Text>
      </Card>
    </Grid.Col>
  );
};

export default CalendarCell;
