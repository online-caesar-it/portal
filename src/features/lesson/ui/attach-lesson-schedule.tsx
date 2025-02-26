import { Select } from "@mantine/core";
import { useForm } from "@mantine/form";
import { queryLesson } from "~/entities/lesson/hooks/use-query-lesson";
import { querySchedule } from "~/entities/schedule/hooks/use-query-schedule";
import ScheduleButtonsActions from "~/features/schedule/ui/schedule-action-buttons";

const AttachLessonSchedule = ({
  scheduleId,
  onClose,
}: {
  scheduleId: string;
  onClose: () => void;
}) => {
  const { data } = queryLesson.useGetMyLessons();
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      scheduleId,
      lessonId: "",
    },
    validate: {
      lessonId: (value) => (value ? null : "Необходимо выбрать урок"),
    },
  });
  const { mutate } = querySchedule.useAttachLessonToSchedule(onClose);

  return (
    <form onSubmit={form.onSubmit((values) => mutate(values))}>
      <Select
        data={data?.map((it) => ({
          label: it.lessonName,
          value: it.lessonId,
        }))}
        {...form.getInputProps("lessonId")}
        withAsterisk
        label={"Выберите урок"}
        placeholder={"Выберите из списка"}
      />
      <ScheduleButtonsActions text={"Прикрепить"} onClose={onClose} />
    </form>
  );
};

export default AttachLessonSchedule;
