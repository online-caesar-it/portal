import { Button, Drawer, Flex, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import ScheduleCreateForm from "~/features/schedule/ui/schedule-create-form";
import moment from "moment";
import { useGroupScheduleByDate } from "~/entities/schedule/hooks/use-group-schedule-by-date";
import ScheduleGroupedList from "~/features/schedule/ui/schedule-grouped-list";

const ProfileScheduleEducator = () => {
  const [opened, { toggle, close }] = useDisclosure();
  const { data, currentWeekStart, nextWeekEnd, groupedData } =
    useGroupScheduleByDate();

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
      <ScheduleGroupedList data={groupedData ?? {}} />
    </Flex>
  );
};

export default ProfileScheduleEducator;
