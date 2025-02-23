import { Card, Title, Text, Grid, Avatar, GridCol } from "@mantine/core";
import { RoleEnum } from "~/shared/enums/role-enum";
import { useSession } from "~/shared/hooks/useSession";

const ProfileData = () => {
  const { session } = useSession();

  const user = session?.data;
  return (
    <Card shadow="sm" padding="lg" radius="md" mt={"lg"}>
      <Grid>
        <GridCol span={2}>
          <Avatar size={"xl"} src={user?.avatar} alt="User avatar" />
        </GridCol>
        <GridCol span={8}>
          <Title order={2}>
            {user?.firstName + " " + user?.surname + " " + user?.patronymic}
          </Title>
          <Text size="xl" color="dimmed">
            Роль:{" "}
            {user?.role === RoleEnum.student ? "Студент" : "Преподаватель"}
          </Text>
        </GridCol>
      </Grid>
      <Text mt="md" size="xl" color="dimmed">
        Телефон: {user?.config.phone_number || "Не указан"}
      </Text>
    </Card>
  );
};

export default ProfileData;
