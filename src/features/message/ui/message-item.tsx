import { Card, Text, Flex } from "@mantine/core";
import { TMessageType } from "~/shared/types/chat-type";
import { TUser } from "~/shared/types/user-type";
import moment from "moment";
const MessageItem = ({ item, user }: { item: TMessageType; user?: TUser }) => {
  const isOwner = item.ownerId === user?.id;

  return (
    <Flex justify={isOwner ? "flex-end" : "flex-start"} mb="10px" w={"100%"}>
      <Card radius={"lg"} w={"25%"} bg={"gray"} p="md">
        <Flex direction={"column"} align={"start"} justify={"start"} p={"xs"}>
          <Text size="sm" bd={"white"}>
            {item?.text}
          </Text>
          <Text size="sm" bd={"white"}>
            {item?.owner?.firstName}
          </Text>
          <Text size="xs" color="dimmed" style={{ alignSelf: "flex-end" }}>
            {moment(item.createdAt).format("MMMM DD HH:MM")}
          </Text>
        </Flex>
      </Card>
    </Flex>
  );
};

export default MessageItem;
