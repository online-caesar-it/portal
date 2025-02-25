import { Button, Flex, Group, MultiSelect, Text } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { querySchedule } from "~/entities/schedule/hooks/use-query-schedule";
import { TWorkingTime } from "~/shared/types/schedule-type";

const DAYS = [
  { value: "1", label: "Понедельник" },
  { value: "2", label: "Вторник" },
  { value: "3", label: "Среда" },
  { value: "4", label: "Четверг" },
  { value: "5", label: "Пятница" },
  { value: "6", label: "Суббота" },
  { value: "0", label: "Воскресенье" },
];

interface ScheduleFormValues {
  workingDays: string[];
  intervalsByDay: Record<string, TWorkingTime[]>;
}

const ScheduleCreateForm = ({ close }: { close: () => void }) => {
  const { submit } = querySchedule.useCreateSchedule(close);

  const form = useForm<ScheduleFormValues>({
    initialValues: {
      workingDays: [],
      intervalsByDay: {},
    },
    validate: {
      workingDays: (value) => (value.length > 0 ? null : "Выберите дни недели"),
      intervalsByDay: (value) => {
        for (const day in value) {
          if (value[day].length === 0) {
            return "Для каждого дня выберите хотя бы один интервал";
          }
          for (const interval of value[day]) {
            if (interval.endTime < interval.startTime) {
              return "Конец интервала не может быть меньше начала интервала";
            }
          }
        }
        return null;
      },
    },
  });

  const handleSubmit = (values: ScheduleFormValues) => {
    const formattedValues = {
      workingDays: Object.keys(values.intervalsByDay).map((day) => ({
        day: Number(day),
        timeIntervals: values.intervalsByDay[day],
      })),
    };
    submit(formattedValues);
    form.reset();
  };

  const addInterval = (day: string) => {
    const updatedIntervals = form.values.intervalsByDay[day]
      ? [...form.values.intervalsByDay[day], { startTime: "", endTime: "" }]
      : [{ startTime: "", endTime: "" }];
    form.setFieldValue(`intervalsByDay.${day}`, updatedIntervals);
  };

  const removeInterval = (day: string, index: number) => {
    const updatedIntervals = form.values.intervalsByDay[day].filter(
      (_, i) => i !== index
    );
    form.setFieldValue(`intervalsByDay.${day}`, updatedIntervals);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Flex direction="column" gap={"lg"} w={"50%"}>
        <Text>
          Для корректности расписания в интервале выберите часы уроков
        </Text>
        <MultiSelect
          label="Дни недели"
          placeholder="Выберите дни недели"
          {...form.getInputProps("workingDays")}
          data={DAYS}
          withAsterisk
          onChange={(value) => {
            form.setFieldValue("workingDays", value);
            const updatedIntervals = { ...form.values.intervalsByDay };
            value.forEach((day) => {
              if (!updatedIntervals[day]) {
                updatedIntervals[day] = [{ startTime: "", endTime: "" }];
              }
            });
            form.setFieldValue("intervalsByDay", updatedIntervals);
          }}
        />

        {form.values.workingDays.map((day) => (
          <div key={day}>
            <Text size="lg">{DAYS.find((d) => d.value === day)?.label}</Text>
            {form.values.intervalsByDay[day]?.map((interval, index) => (
              <Group key={`${day}-${index}`}>
                <Group>
                  <TimeInput
                    label="Начало интервала"
                    placeholder="Выберите начало интервала"
                    value={interval.startTime}
                    withAsterisk
                    onChange={(e) =>
                      form.setFieldValue(
                        `intervalsByDay.${day}.${index}.startTime`,
                        e.target.value
                      )
                    }
                  />
                  <TimeInput
                    label="Конец интервала"
                    placeholder="Выберите конец интервала"
                    value={interval.endTime}
                    withAsterisk
                    onChange={(e) =>
                      form.setFieldValue(
                        `intervalsByDay.${day}.${index}.endTime`,
                        e.target.value
                      )
                    }
                  />
                </Group>
                <Button
                  variant="outline"
                  color="red"
                  onClick={() => removeInterval(day, index)}
                >
                  Удалить интервал
                </Button>
              </Group>
            ))}
            <Button onClick={() => addInterval(day)} variant="outline" mt="xs">
              Добавить интервал для {DAYS.find((d) => d.value === day)?.label}
            </Button>
          </div>
        ))}
        <Button type="submit" mt="lg">
          Создать расписание
        </Button>
      </Flex>
    </form>
  );
};

export default ScheduleCreateForm;
