import { Card, Text, Flex } from "@mantine/core";
import { TMessageType } from "~/shared/types/chat-type";
import { TUser } from "~/shared/types/user-type";
import moment from "moment";

const MessageItem = ({ item, user }: { item: TMessageType; user?: TUser }) => {
  const isOwner = item.ownerId === user?.id;

  return (
    <Flex justify={isOwner ? "flex-end" : "flex-start"} mb="4px" w="100%">
      <Card
        radius={16}
        px="md"
        py="xs"
        className={isOwner ? "bg-blue-20" : "bg-blue-80"}
        style={{
          maxWidth: "80%",
          backgroundColor: isOwner ? "#0088cc" : "#8774e0",
          borderBottomRightRadius: isOwner ? 4 : 16,
          borderBottomLeftRadius: isOwner ? 16 : 4,
          wordWrap: "break-word", // Перенос слов на новую строку
          overflowWrap: "break-word", // Альтернатива для wordWrap
          whiteSpace: "pre-line", // Сохраняет переносы строк, но позволяет тексту переноситься
        }}
      >
        <Text size="sm" style={{ wordBreak: "break-word" }}>
          {item.text}
        </Text>
        <Text size="xs" style={{ opacity: 0.6, alignSelf: "flex-end" }}>
          {moment(item.createdAt).format("HH:mm")}
        </Text>
      </Card>
    </Flex>
  );
};

export default MessageItem;
