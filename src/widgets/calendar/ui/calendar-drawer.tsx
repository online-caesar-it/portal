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
import { useSession } from "~/shared/hooks/useSession";
import { RoleEnum } from "~/shared/enums/role-enum";
import List from "~/shared/lib/components/list";
import ScheduleRequestForm from "~/features/schedule/ui/schedule-request-form";
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
  const { session } = useSession();
  const role = session?.data.role;
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
            <Text>{moment(schedule.dateLesson).format("MM.DD dddd")}</Text>
          </Group>
          <Group>
            <Text size="lg">Время:</Text>
            <Text>
              {schedule.startTime} - {schedule.endTime}
            </Text>
          </Group>
          <Group>
            <Text size="lg">
              {role === RoleEnum.student ? "Преподаватель:" : "Группа:"}
            </Text>
            {role === RoleEnum.student ? (
              <Text>
                {schedule.educator.firstName + " " + schedule.educator.surname}
              </Text>
            ) : (
              <List list={schedule.students}>
                {({ firstName, surname }) => (
                  <Text>{firstName + " " + surname}</Text>
                )}
              </List>
            )}
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

      {isTransferFormOpen && (
        <ScheduleRequestForm
          onSubmit={() => {}}
          onClose={() => setTransferFormOpen(false)}
        />
      )}
      {isCancelFormOpen && (
        <ScheduleRequestForm
          onSubmit={() => {}}
          onClose={() => setCancelFormOpen(false)}
        />
      )}
    </Drawer>
  );
};

export default CalendarDrawer;
