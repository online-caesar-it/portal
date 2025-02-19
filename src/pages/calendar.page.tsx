import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { TSchedule } from "~/shared/types/schedule-type";
import Calendar from "~/widgets/calendar/ui/calendar";
import CalendarDrawer from "~/widgets/calendar/ui/calendar-drawer";

const CalendarPage = () => {
  const [schedule, setSchedule] = useState<TSchedule>();
  const [opened, { toggle, close }] = useDisclosure();
  const handleClick = (schedule: TSchedule) => {
    setSchedule(schedule);
    toggle();
    console.log(opened);
  };
  console.log(schedule);
  return (
    <>
      <Calendar handleClick={handleClick} />
      {schedule && (
        <CalendarDrawer
          opened={opened}
          onClose={close}
          position={"right"}
          schedule={schedule}
        />
      )}
    </>
  );
};

export default CalendarPage;
