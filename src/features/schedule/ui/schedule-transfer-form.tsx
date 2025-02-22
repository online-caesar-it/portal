import { useForm } from "@mantine/form";
import { Dialog, Text, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import ReasonField from "./reason-field";
import ScheduleButtonsActions from "./schedule-action-buttons";
import { TScheduleMove } from "~/shared/types/schedule-type";
import { querySchedule } from "~/entities/schedule/hooks/use-query-schedule";
import { useState } from "react";

const ScheduleTransferForm = ({
  onClose,
  scheduleId,
}: {
  onClose: () => void;
  scheduleId: string;
}) => {
  const [dialog, setDialog] = useState({ open: false, message: "" });
  const form = useForm({
    initialValues: {
      newDateLesson: "",
      newStartTime: "",
      newEndTime: "",
      reason: "",
      scheduleId,
    },
    validate: {
      newDateLesson: (value) => (!value ? "Выберите дату" : null),
      newStartTime: (value) => (value ? null : "Укажите время начала"),
      newEndTime: (value) => (value ? null : "Укажите время окончания"),
      reason: (value) => (value ? null : "Укажите причину"),
    },
  });
  const { submit } = querySchedule.useCreateTransferSchedule({
    onSuccess: () => {
      setDialog({
        open: true,
        message: "Запрос на перенос был отправлен",
      });
      onClose();
    },
    onError: (error) =>
      setDialog({
        open: true,
        message: error,
      }),
  });
  const handleSubmit = (values: TScheduleMove) => {
    submit(values);
  };
  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
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
      <Dialog
        opened={dialog.open}
        onClose={() =>
          setDialog({
            message: "",
            open: false,
          })
        }
        withCloseButton
      >
        <Text>{dialog.message}</Text>
      </Dialog>
    </form>
  );
};

export default ScheduleTransferForm;
