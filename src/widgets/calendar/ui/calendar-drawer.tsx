import { Drawer, DrawerProps, Flex } from "@mantine/core";
import { TSchedule } from "~/shared/types/schedule-type";
import ScheduleCardForms from "~/features/schedule/ui/schedule-card-forms";
import List from "~/shared/lib/components/list";

const CalendarDrawer = ({
  schedule,
  ...rest
}: { schedule: TSchedule[] } & DrawerProps) => {
  return (
    <Drawer title="Урок" {...rest}>
      <Flex direction={"column"} gap={"lg"}>
        <List list={schedule}>
          {(schedule) => <ScheduleCardForms schedule={schedule} />}
        </List>
      </Flex>
    </Drawer>
  );
};

export default CalendarDrawer;
