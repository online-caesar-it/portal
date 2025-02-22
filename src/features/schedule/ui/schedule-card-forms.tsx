import { Button, Card, Group, Stack, Text } from "@mantine/core";
import { TSchedule } from "~/shared/types/schedule-type";
import moment from "moment";
import { RoleEnum } from "~/shared/enums/role-enum";
import List from "~/shared/lib/components/list";
import ScheduleStatus from "~/entities/schedule/ui/schedule-status";
import CalendarForms from "~/widgets/calendar/ui/calendar-forms";
import { useSession } from "~/shared/hooks/useSession";
import { useState } from "react";
const ScheduleCardForms = ({ schedule }: { schedule: TSchedule }) => {
  const { session } = useSession();
  const role = session?.data.role;
  const [isTransferFormOpen, setTransferFormOpen] = useState(false);
  const [isCancelFormOpen, setCancelFormOpen] = useState(false);
  return (
    <>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack>
          <Group>
            <ScheduleStatus status={schedule.status} />
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
      <CalendarForms
        onCloseCancel={() => setCancelFormOpen(false)}
        onCloseTransfer={() => setTransferFormOpen(false)}
        isCancelFormOpen={isCancelFormOpen}
        isTransferFormOpen={isTransferFormOpen}
        scheduleId={schedule.id}
      />
    </>
  );
};

export default ScheduleCardForms;
