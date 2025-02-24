import { Avatar, Card, Dialog, Flex, Group, Select, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import moment from "moment";
import { useState } from "react";
import { useQueryMyDirection } from "~/entities/direction/hooks/useQueryDirection";
import { querySchedule } from "~/entities/schedule/hooks/use-query-schedule";
import ScheduleCardAttached from "~/entities/schedule/ui/schedule-card-attached";
import { useSession } from "~/shared/hooks/useSession";
import If from "~/shared/lib/components/if";

const ScheduleForAttachedList = () => {
  const today = moment();
  const currentWeekStart = today.clone().startOf("week");
  const nextWeekEnd = today.clone().add(1, "week").endOf("week");
  const [opened, { toggle, close }] = useDisclosure();
  const startDate = currentWeekStart.format("YYYY-MM-DD");
  const endDate = nextWeekEnd.format("YYYY-MM-DD");
  const { data } = useQueryMyDirection();
  const [selectId, setSelectId] = useState((data && data[0]?.id) || "");
  const { data: schedule } = querySchedule.useGetScheduleByDirection({
    directionId: selectId,
    startDate,
    endDate,
  });
  const { submit, isPending } = querySchedule.useAttachedStudentToSchedule({
    onSuccess: () => toggle(),
  });
  const { session } = useSession();
  return (
    <Flex direction={"column"} gap={"lg"} mt={"lg"}>
      <If when={data && data?.length > 1}>
        <Select
          label={"Выберите направление"}
          placeholder={"Выберите из списка"}
          data={data?.map(({ id, name }) => ({ label: name, value: id })) || []}
          onChange={(value) => setSelectId(value ?? "")}
          w={"32%"}
        />
      </If>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {schedule?.map(({ educator, schedule }) => (
          <Card key={educator.id} shadow="md" p="lg" radius="lg" withBorder>
            <Group>
              <Avatar src={educator.avatar} size="lg" radius="xl" />
              <div>
                <Text size="lg">
                  {`${educator.surname} ${educator.firstName} ${educator.patronymic}`}
                </Text>
                <Text size="sm" color="dimmed">
                  Преподаватель
                </Text>
              </div>
            </Group>
            <ScheduleCardAttached
              onClick={(id) => submit(id)}
              userId={session?.data.id ?? ""}
              schedule={schedule}
              isPending={isPending}
            />
          </Card>
        ))}
      </div>
      <Dialog opened={opened} onClose={close} withCloseButton>
        <Text>Вы успешно записались на занятие</Text>
      </Dialog>
    </Flex>
  );
};

export default ScheduleForAttachedList;
