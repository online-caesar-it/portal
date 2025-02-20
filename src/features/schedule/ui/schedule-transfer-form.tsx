import { useForm } from "@mantine/form";
import { TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import ReasonField from "./reason-field";
import ScheduleButtonsActions from "./schedule-action-buttons";

const ScheduleTransferForm = ({ onClose }: { onClose: () => void }) => {
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
      <DateInput
        label="Дата урока"
        placeholder="Выберите дату"
        {...form.getInputProps("newDateLesson")}
        withAsterisk
      />
      <TextInput
        label="Начало урока"
        placeholder="HH:MM"
        {...form.getInputProps("newStartTime")}
        withAsterisk
      />
      <TextInput
        label="Окончание урока"
        placeholder="HH:MM"
        {...form.getInputProps("newEndTime")}
        withAsterisk
      />
      <ReasonField form={form} />
      <ScheduleButtonsActions onClose={onClose} />
    </form>
  );
};

export default ScheduleTransferForm;
