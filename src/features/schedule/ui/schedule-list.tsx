import moment from "moment";
import { Card, Flex, Text } from "@mantine/core";
import { TSchedule } from "~/shared/types/schedule-type";
const ScheduleList = ({ data }: { data: TSchedule[] }) => {
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
  return (
    <Flex direction={"column"} gap={"xl"} mt={"lg"}>
      {Object.keys(groupedData ?? {}).map((date) => (
        <Card p="lg" radius="md" withBorder key={date}>
          <Text size="lg">{moment(date).format("MM.DD")}</Text>
          {groupedData &&
            groupedData[date].map((schedule) => (
              <Text size="sm" key={schedule.id}>
                {schedule.startTime} - {schedule.endTime}
              </Text>
            ))}
        </Card>
      ))}
    </Flex>
  );
};

export default ScheduleList;
