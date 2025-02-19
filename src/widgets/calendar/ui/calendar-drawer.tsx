import {
  Badge,
  Button,
  Card,
  Drawer,
  DrawerProps,
  Group,
  Stack,
  Text,
} from "@mantine/core";
import { EScheduleStatus } from "~/shared/enums/schedule-enum";
import { TSchedule } from "~/shared/types/schedule-type";
import { useState } from "react";
import moment from "moment";

const statusColors = {
  [EScheduleStatus.SCHEDULED]: {
    color: "green",
    text: "По расписанию",
  },
  [EScheduleStatus.CANCELED]: {
    color: "red",
    text: "Отменено",
  },
  [EScheduleStatus.MOVED]: {
    color: "blue",
    text: "Перенесено",
  },
};

const CalendarDrawer = ({
  schedule,
  ...rest
}: { schedule: TSchedule } & DrawerProps) => {
  const [isTransferFormOpen, setTransferFormOpen] = useState(false);
  const [isCancelFormOpen, setCancelFormOpen] = useState(false);
  // const { session } = useSession();
  // const role = session?.data.role;
  return (
    <Drawer title="Урок" {...rest}>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack>
          <Group>
            <Badge color={statusColors[schedule.status].color}>
              {statusColors[schedule.status].text}
            </Badge>
          </Group>
          <Group>
            <Text size="lg">Дата:</Text>
            <Text>{moment(schedule.dateLesson).format("MM-DD")}</Text>
          </Group>
          <Group>
            <Text size="lg">Время:</Text>
            <Text>
              {schedule.startTime} - {schedule.endTime}
            </Text>
          </Group>
          <Group>
            <Text size="lg">Преподаватель:</Text>
            <Text>{schedule.userId}</Text>
          </Group>
          <Group mt="md">
            <Button color="blue" onClick={() => setTransferFormOpen(true)}>
              Запросить перенос
            </Button>
            <Button color="red" onClick={() => setCancelFormOpen(true)}>
              Запросить отмену
            </Button>
          </Group>
        </Stack>
      </Card>

      {isTransferFormOpen && <Text>Форма запроса переноса...</Text>}
      {isCancelFormOpen && <Text>Форма запроса отмены...</Text>}
    </Drawer>
  );
};

export default CalendarDrawer;
