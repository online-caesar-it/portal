import { Button, Flex, Group, MultiSelect, Text } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { querySchedule } from "~/entities/schedule/hooks/use-query-schedule";
import { TScheduleCreate } from "~/shared/types/schedule-type";
const DAYS = [
  { value: "1", label: "Понедельник" },
  { value: "2", label: "Вторник" },
  { value: "3", label: "Среда" },
  { value: "4", label: "Четверг" },
  { value: "5", label: "Пятница" },
  { value: "6", label: "Суббота" },
  { value: "0", label: "Воскресенье" },
];
const ScheduleCreateForm = ({ close }: { close: () => void }) => {
  const { submit } = querySchedule.useCreateSchedule(close);
  const form = useForm({
    initialValues: {
      workingDays: [],
      timeIntervals: [{ startTime: "", endTime: "" }],
    },
    validate: {
      workingDays: (value) => (value.length > 0 ? null : "Выберите дни недели"),
      timeIntervals: (value) => {
        if (value.length > 0) {
          for (const interval of value) {
            if (interval.endTime < interval.startTime) {
              return "Конец интервала не может быть меньше начала интервала";
            }
          }
        } else {
          return "Выберите интервалы времени";
        }
        return null;
      },
    },
  });

  const handleSubmit = (values: TScheduleCreate) => {
    submit(values);
    form.reset();
  };
  const addInterval = () => {
    form.setFieldValue("timeIntervals", [
      ...form.values.timeIntervals,
      { startTime: "", endTime: "" },
    ]);
  };
  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Flex direction="column" gap={"lg"} w={"50%"}>
        <Text>
          Для корректности расписание в интервале выберите часы уроков
        </Text>
        <MultiSelect
          label="Дни недели"
          placeholder="Выберите дни недели"
          {...form.getInputProps("workingDays")}
          data={DAYS}
          withAsterisk
        />
        {form.values.timeIntervals.map((interval, index) => (
          <Group key={index}>
            <TimeInput
              label="Начало интервала"
              placeholder="Выберите начало интервала"
              value={interval.startTime}
              withAsterisk
              onChange={(e) =>
                form.setFieldValue(
                  `timeIntervals.${index}.startTime`,
                  e.target.value
                )
              }
            />
            <TimeInput
              label="Конец интервала"
              placeholder="Выберите конец интервала"
              withAsterisk
              value={interval.endTime}
              onChange={(e) =>
                form.setFieldValue(
                  `timeIntervals.${index}.endTime`,
                  e.target.value
                )
              }
            />
          </Group>
        ))}
        <Button onClick={addInterval}>Добавить интервал</Button>
        <Button type="submit">Создать расписание</Button>
      </Flex>
    </form>
  );
};

export default ScheduleCreateForm;
