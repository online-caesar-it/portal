import { Button } from "@mantine/core";
import moment from "moment";
import { querySchedule } from "~/entities/schedule/hooks/use-query-schedule";

const ScheduleButtonEnd = ({
  scheduleId,
  date,
}: {
  scheduleId: string;
  date: string;
}) => {
  const isDisabled = moment().isBefore(moment(date));
  const { mutate } = querySchedule.useUpdateScheduleEnd();
  return (
    <Button disabled={isDisabled} onClick={() => mutate({ scheduleId })}>
      Урок прошел
    </Button>
  );
};

export default ScheduleButtonEnd;
