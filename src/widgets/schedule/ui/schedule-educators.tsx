import { useEffect } from "react";
import { useForm } from "@mantine/form";
import {
  Select,
  Card,
  Group,
  Text,
  Stack,
  Title,
  Loader,
  Flex,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import moment from "moment";
import { queryEducator } from "~/entities/educator/hooks/use-query-educator";
import { querySchedule } from "~/entities/schedule/hooks/use-query-schedule";
import ScheduleStatus from "~/entities/schedule/ui/schedule-status";

const ScheduleEducators = () => {
  const { data: educators } = queryEducator.useGetEducators();

  const initialEducatorId = educators?.[0]?.id || "";
  const today = moment().startOf("day");
  const nextWeek = moment().add(6, "days").endOf("day");

  const form = useForm({
    initialValues: {
      educatorId: initialEducatorId,
      dateRange: [today.toDate(), nextWeek.toDate()] as [Date, Date],
    },
  });

  const {
    data: schedule,
    isLoading,
    refetch,
  } = querySchedule.useGetScheduledFilter({
    id: form.values.educatorId,
    startDate: moment(form.values.dateRange[0]).format("YYYY-MM-DD"),
    endDate: moment(form.values.dateRange[1]).format("YYYY-MM-DD"),
  });

  useEffect(() => {
    if (educators?.length && !form.values.educatorId) {
      form.setFieldValue("educatorId", educators[0].id);
    }
  }, [educators]);

  useEffect(() => {
    if (
      form.values.educatorId &&
      form.values.dateRange[0] &&
      form.values.dateRange[1]
    ) {
      refetch();
    }
  }, [form.values]);

  return (
    <Flex direction={"column"} mt={"lg"} gap={"xl"} pb={"xl"}>
      <Title order={2}>Расписание преподавателей</Title>

      <form onSubmit={form.onSubmit(() => refetch())}>
        <Flex align={"center"} gap={"xl"}>
          <Select
            label="Выберите преподавателя"
            placeholder="Выберите..."
            {...form.getInputProps("educatorId")}
            data={
              educators?.map((e) => ({
                value: e.id,
                label: `${e.firstName} ${e.surname}`,
              })) || []
            }
            clearable
          />

          <DatePickerInput
            type="range"
            {...form.getInputProps("dateRange")}
            label="Выберите период"
            placeholder="Выберите даты"
            allowSingleDateInRange
            dropdownType="modal"
          />
        </Flex>
      </form>

      <Stack>
        {isLoading ? (
          <Loader />
        ) : schedule?.length ? (
          schedule.map((lesson) => (
            <Card key={lesson.id} shadow="sm" p="md" radius="md" withBorder>
              <Group mb={"sm"}>
                <Text>{moment(lesson.dateLesson).format("DD.MM.YYYY")}</Text>
                <Text color="dimmed">
                  {lesson.startTime} - {lesson.endTime}
                </Text>
              </Group>
              <ScheduleStatus status={lesson.status} />
              <Text size="sm" mt="xs">
                Студенты:{" "}
                {lesson.students.map((s) => s.firstName).join(", ") || "Нет"}
              </Text>
            </Card>
          ))
        ) : (
          <Text>Нет расписания на выбранные даты.</Text>
        )}
      </Stack>
    </Flex>
  );
};

export default ScheduleEducators;
