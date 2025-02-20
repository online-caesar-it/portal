import { useForm } from "@mantine/form";
import ReasonField from "./reason-field";
import ScheduleButtonsActions from "./schedule-action-buttons";

const ScheduleCancelForm = ({ onClose }: { onClose: () => void }) => {
  const form = useForm({
    initialValues: {
      newDateLesson: null,
      newStartTime: "",
      newEndTime: "",
      reason: "",
    },
    validate: {
      newDateLesson: (value) => (!value ? "Выберите дату" : null),
      newStartTime: (value) => (value ? null : "Укажите время начала"),
      newEndTime: (value) => (value ? null : "Укажите время окончания"),
      reason: (value) => (value ? null : "Укажите причину"),
    },
  });
  return (
    <form onSubmit={form.onSubmit(() => {})}>
      <ReasonField form={form} />
      <ScheduleButtonsActions onClose={onClose} />
    </form>
  );
};

export default ScheduleCancelForm;
