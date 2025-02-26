import { useForm } from "@mantine/form";
import ReasonField from "./reason-field";
import ScheduleButtonsActions from "./schedule-action-buttons";
import { querySchedule } from "~/entities/schedule/hooks/use-query-schedule";

const ScheduleCancelForm = ({
  onClose,
  scheduleId,
}: {
  onClose: () => void;
  scheduleId: string;
}) => {
  const form = useForm({
    initialValues: {
      reason: "",
      scheduleId,
    },
    validate: {
      reason: (value) => (value ? null : "Укажите причину"),
    },
  });
  const { submit } = querySchedule.useCreateCancelSchedule({
    onSuccess: onClose,
    onError: () => {},
  });
  return (
    <form onSubmit={form.onSubmit(submit)}>
      <ReasonField form={form} />
      <ScheduleButtonsActions text={"Отправить"} onClose={onClose} />
    </form>
  );
};

export default ScheduleCancelForm;
