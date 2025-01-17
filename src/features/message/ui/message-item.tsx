import { Card, Text, Flex } from "@mantine/core";
import { TMessageType } from "~/shared/types/chat-type";
import { TUser } from "~/shared/types/user-type";
import moment from "moment";
const MessageItem = ({ item, user }: { item: TMessageType; user?: TUser }) => {
  const isOwner = item.ownerId === user?.id;

  return (
    <Flex justify={isOwner ? "flex-end" : "flex-start"} mb="10px" w={"100%"}>
      <Card radius={"lg"} w={"25%"} bg={isOwner ? "blue" : "gray"} px={"sm"}>
        <Flex direction={"column"} align={"end"} justify={"end"} p={"xs"}>
          <Flex direction={"column"} w={"100%"} align={"start"}>
            <Text size="sm" bd={"white"}>
              {item?.text}
            </Text>
            <Text size="sm" bd={"white"}>
              Отправитель: {item?.interlocutor?.firstName}
            </Text>
          </Flex>
          <Text size="xs">
            {moment(item.createdAt).format("MMMM Do, YYYY [at] HH:mm")}
          </Text>
        </Flex>
      </Card>
    </Flex>
  );
};

export default MessageItem;
