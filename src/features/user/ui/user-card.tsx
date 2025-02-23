import { TUser } from "~/shared/types/user-type";
import { Card, Avatar, Text, Stack, Flex } from "@mantine/core";
import { ReactNode } from "react";
const UserCard = ({
  user,
  render,
}: {
  user: TUser;
  render?: () => ReactNode;
}) => {
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <Flex align={"center"} justify={"space-between"}>
        <Flex align={"center"} gap={"lg"}>
          <Avatar src={user.avatar} radius="xl" size="lg" />
          <Stack gap={2}>
            <Text size="lg">{user.firstName}</Text>
            <Text size="sm" color="dimmed">
              {user.config.email}
            </Text>
          </Stack>
        </Flex>
        {render && render()}
      </Flex>
    </Card>
  );
};

export default UserCard;
