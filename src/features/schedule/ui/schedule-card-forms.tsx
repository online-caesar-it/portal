import { Button, Card, Flex, Group, Stack, Text } from "@mantine/core";
import { TSchedule } from "~/shared/types/schedule-type";
import moment from "moment";
import { RoleEnum } from "~/shared/enums/role-enum";
import List from "~/shared/lib/components/list";
import ScheduleStatus from "~/entities/schedule/ui/schedule-status";
import CalendarForms from "~/widgets/calendar/ui/calendar-forms";
import { useSession } from "~/shared/hooks/useSession";
import { useState } from "react";
import VisibleForRoles from "~/shared/lib/components/visible-for-roles";
import If from "~/shared/lib/components/if";
import { EScheduleStatus } from "~/shared/enums/schedule-enum";
import LessonItem from "~/features/lesson/ui/lesson-item";
import ScheduleButtonEnd from "./schedule-button-end";
const ScheduleCardForms = ({ schedule }: { schedule: TSchedule }) => {
  const { session } = useSession();
  const role = session?.data.role;
  const [isTransferFormOpen, setTransferFormOpen] = useState(false);
  const [isCancelFormOpen, setCancelFormOpen] = useState(false);
  const [isAttachedLessonOpen, setIsAttachedLessonOpen] = useState(false);
  return (
    <>
      <Card
        shadow="sm"
        padding="lg"
        radius="md"
        withBorder
        className="max-h-[450px] overflow-y-auto"
      >
        <Stack className="overflow-y-auto">
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
          {schedule.lesson && <LessonItem lesson={schedule.lesson} />}
          <Flex
            direction={role === RoleEnum.EDUCATOR ? "column" : "row"}
            gap={role === RoleEnum.EDUCATOR ? "lg" : "sm"}
          >
            <Text size="lg">
              {role === RoleEnum.student
                ? "Преподаватель:"
                : schedule.students.length > 0
                ? "Студенты:"
                : ""}
            </Text>
            {role === RoleEnum.student ? (
              <Text color={"blue"} size={"lg"}>
                {schedule?.educator?.firstName +
                  " " +
                  schedule?.educator?.surname}
              </Text>
            ) : (
              <List list={schedule.students}>
                {({ firstName, surname }) => (
                  <Text color={"blue"} size={"lg"}>
                    {firstName + " " + surname}
                  </Text>
                )}
              </List>
            )}
          </Flex>
          <If when={schedule.status === EScheduleStatus.SCHEDULED}>
            <Group mt="md">
              <VisibleForRoles roles={[RoleEnum.EDUCATOR]}>
                <Button color="blue" onClick={() => setTransferFormOpen(true)}>
                  Запросить перенос
                </Button>
              </VisibleForRoles>
              <Button color="red" onClick={() => setCancelFormOpen(true)}>
                {role === RoleEnum.EDUCATOR ? "Запросить отмену" : "Отменить"}
              </Button>
              <VisibleForRoles roles={[RoleEnum.EDUCATOR]}>
                <Button
                  onClick={() => setIsAttachedLessonOpen(true)}
                  disabled={schedule.lessonId ? !!schedule.lessonId : false}
                >
                  Прикрепить урок
                </Button>
              </VisibleForRoles>
              <VisibleForRoles roles={[RoleEnum.EDUCATOR]}>
                <ScheduleButtonEnd
                  date={schedule.dateLesson}
                  scheduleId={schedule.id}
                />
              </VisibleForRoles>
            </Group>
          </If>
        </Stack>
      </Card>
      <CalendarForms
        onCloseCancel={() => setCancelFormOpen(false)}
        onCloseTransfer={() => setTransferFormOpen(false)}
        isCancelFormOpen={isCancelFormOpen}
        isTransferFormOpen={isTransferFormOpen}
        scheduleId={schedule.id}
        isAttachedLessonOpen={isAttachedLessonOpen}
        onCloseAttachedLesson={() => setIsAttachedLessonOpen(false)}
      />
    </>
  );
};

export default ScheduleCardForms;
