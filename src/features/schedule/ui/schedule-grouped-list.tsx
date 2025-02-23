import moment from "moment";
import { Card, Flex, Text } from "@mantine/core";
import { TSchedule } from "~/shared/types/schedule-type";
const ScheduleGroupedList = ({
  data,
}: {
  data: Record<string, TSchedule[]>;
}) => {
  return (
    <Flex direction={"column"} gap={"xl"} mt={"lg"}>
      {Object.keys(data ?? {}).map((date) => (
        <Card p="lg" radius="md" withBorder key={date}>
          <Text size="lg">{moment(date).format("MM.DD")}</Text>
          {data &&
            data[date].map((schedule) => (
              <Text size="sm" key={schedule.id}>
                {schedule.startTime} - {schedule.endTime}
              </Text>
            ))}
        </Card>
      ))}
    </Flex>
  );
};

export default ScheduleGroupedList;
