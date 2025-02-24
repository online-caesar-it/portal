import { Card, Title, Text, Avatar, Flex } from "@mantine/core";
import { RoleEnum } from "~/shared/enums/role-enum";
import { useSession } from "~/shared/hooks/useSession";

const ProfileData = () => {
  const { session } = useSession();

  const user = session?.data;
  return (
    <Card shadow="sm" padding="lg" radius="md" mt={"lg"}>
      <Flex align={"center"} gap={"lg"}>
        <Avatar size={"xl"} src={user?.avatar} alt="User avatar" />
        <Flex direction={"column"}>
          <Title order={2}>
            {user?.firstName + " " + user?.surname + " " + user?.patronymic}
          </Title>
          <Text size="xl" color="dimmed">
            Роль:{" "}
            {user?.role === RoleEnum.student ? "Студент" : "Преподаватель"}
          </Text>
        </Flex>
      </Flex>
      <Text mt="md" size="xl" color="dimmed">
        Телефон: {user?.config.phone_number || "Не указан"}
      </Text>
    </Card>
  );
};

export default ProfileData;
