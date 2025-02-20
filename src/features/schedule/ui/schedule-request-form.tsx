import { useForm } from "@mantine/form";
import { Button, TextInput, Group } from "@mantine/core";
import { DatePicker } from "@mantine/dates";

const ScheduleRequestForm = ({
  onSubmit,
  onClose,
}: {
  onSubmit: () => void;
  onClose: () => void;
}) => {
  const form = useForm({
    initialValues: {
      newDateLesson: null,
      newStartTime: "",
      newEndTime: "",
    },
    validate: {
      newDateLesson: (value) => (!value ? "Выберите дату" : null),
      newStartTime: (value) => (value ? null : "Укажите время начала"),
      newEndTime: (value) => (value ? null : "Укажите время окончания"),
    },
  });
  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <DatePicker {...form.getInputProps("newDateLesson")} />
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
      <Group mt="md">
        <Button variant="default" onClick={onClose}>
          Отмена
        </Button>
        <Button type="submit">Запросить перенос</Button>
      </Group>
    </form>
  );
};

export default ScheduleRequestForm;
