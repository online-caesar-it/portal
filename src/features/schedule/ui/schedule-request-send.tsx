import {
  Stack,
  Title,
  Loader,
  Card,
  Group,
  Button,
  Text,
  Flex,
} from "@mantine/core";
import ScheduleRequestStatus from "~/entities/schedule/ui/schedule-request-status";
import { TScheduleRequest } from "~/shared/types/schedule-type";

const ScheduleRequestSend = ({
  isLoading,
  data,
  title,
  approve,
  reject,
}: {
  isLoading: boolean;
  data?: TScheduleRequest[];
  title: string;
  approve: (id: string) => void;
  reject: (id: string) => void;
}) => {
  return (
    <Stack mt={"lg"} w={"50%"}>
      <Title order={2}>{title}</Title>
      {isLoading ? (
        <Loader />
      ) : data?.length ? (
        data.map((request) => (
          <Card key={request.id} shadow="sm" p="md" radius="md" withBorder>
            <Group>
              <Text color="dimmed">
                {request.educator.firstName} {request.educator.surname}
              </Text>
            </Group>
            <ScheduleRequestStatus status={request.status} />
            <Text size="sm" mt="xs">
              Преподаватель: {request.educator.firstName}{" "}
              {request.educator.surname}
            </Text>
            <Text>Причина: {request.reason}</Text>
            <Flex align={"center"} gap={"lg"}>
              <Button
                onClick={() => reject(request.id)}
                variant="outline"
                color="red"
                mt="sm"
              >
                Отклонить запрос
              </Button>
              <Button
                onClick={() => approve(request.id)}
                variant="outline"
                color="blue"
                mt="sm"
              >
                Одобрить
              </Button>
            </Flex>
          </Card>
        ))
      ) : (
        <Text>Нет запросов на отмену расписания.</Text>
      )}
    </Stack>
  );
};

export default ScheduleRequestSend;
