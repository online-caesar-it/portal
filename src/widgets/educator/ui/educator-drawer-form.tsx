import { Drawer } from "@mantine/core";
import { directionAdapter } from "~/entities/direction/adapter/direction-adapter";
import { useQueryDirection } from "~/entities/direction/hooks/useQueryDirection";
import { scheduleAdapter } from "~/entities/schedule/adapter/schedule-adapter";
import { querySchedule } from "~/entities/schedule/hooks/use-query-schedule";
import FormCreateEducator from "~/features/educator/ui/form-create-educator";

const EducatorDrawerForm = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { data } = useQueryDirection();
  const { data: workingDays } = querySchedule.useGetWorkingDays();
  return (
    <Drawer
      size={"xl"}
      onClose={onClose}
      opened={open}
      title={"Добавление преподавателя"}
      position={"right"}
    >
      <FormCreateEducator
        workingDays={scheduleAdapter.adapterScheduleWorkingDays(workingDays)}
        directions={directionAdapter.adapterDirection(data ?? [])}
      />
    </Drawer>
  );
};

export default EducatorDrawerForm;
