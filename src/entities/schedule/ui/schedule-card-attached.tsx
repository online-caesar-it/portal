import { Badge, Button, Card, Group, Loader, Text } from "@mantine/core";
import moment from "moment";
import { TSchedule } from "~/shared/types/schedule-type";

const ScheduleCardAttached = ({
  schedule,
  onClick,
  userId,
  isPending,
}: {
  schedule: TSchedule[];
  onClick: (id: string) => void;
  userId: string;
  isPending: boolean;
}) => {
  const groupedSchedule = schedule.reduce<Record<string, TSchedule[]>>(
    (acc, lesson) => {
      const day = moment(lesson.dateLesson).format("DD MMMM, dddd");
      acc[day] = [...(acc[day] || []), lesson];
      return acc;
    },
    {}
  );

  return (
    <div className="mt-4 space-y-4">
      {Object.entries(groupedSchedule).map(([date, lessons]) => (
        <div key={date}>
          <Text size="md" className="text-blue-600">
            {date}
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
            {lessons.map((lesson) => (
              <Card
                key={lesson.id}
                shadow="sm"
                radius="md"
                className="border border-gray-200"
              >
                <Group>
                  <Text>
                    {lesson.startTime} - {lesson.endTime}
                  </Text>
                  <Badge color={lesson.students.length ? "green" : "gray"}>
                    {lesson.students.length > 0
                      ? `Ученики: ${lesson.students.length}`
                      : "Нет учеников"}
                  </Badge>
                </Group>
                <Button
                  variant={"light"}
                  mt={"lg"}
                  radius={"lg"}
                  disabled={lesson.students.some(
                    (student) => student.id === userId
                  )}
                  onClick={() => onClick(lesson.id)}
                >
                  {isPending ? <Loader /> : <Text>Забронировать</Text>}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScheduleCardAttached;
