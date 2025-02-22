import { Button, Drawer, Flex, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ScheduleCreateForm from "~/features/schedule/ui/schedule-create-form";
import ScheduleList from "~/features/schedule/ui/schedule-list";
import { querySchedule } from "~/entities/schedule/hooks/use-query-schedule";
import moment from "moment";

const Profile = () => {
  const [opened, { toggle, close }] = useDisclosure();
  const today = moment();
  const currentWeekStart = today.clone().startOf("week");
  const nextWeekEnd = today.clone().add(1, "week").endOf("week");

  const startDate = currentWeekStart.format("YYYY-MM-DD");
  const endDate = nextWeekEnd.format("YYYY-MM-DD");
  const { data } = querySchedule.useGetSchedule({
    startDate,
    endDate,
  });
  return (
    <Flex direction={"column"} w={"50%"}>
      <Text size={"xl"}>Расписание</Text>
      <Button
        disabled={
          data &&
          data.some((schedule) =>
            moment(schedule.dateLesson).isBetween(currentWeekStart, nextWeekEnd)
          )
        }
        onClick={toggle}
      >
        Добавить расписание на следующую неделю
      </Button>
      <Drawer
        size={"xl"}
        opened={opened}
        title={"Добавление расписания"}
        position={"right"}
        onClose={close}
      >
        <ScheduleCreateForm close={close} />
      </Drawer>
      <ScheduleList data={data ?? []} />
    </Flex>
  );
};

export default Profile;
