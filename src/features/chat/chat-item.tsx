import { Card, Text, Flex, Box } from "@mantine/core";
import { TChat } from "~/shared/types/chat-type";

const ChatItem = ({
  item,
  onClick,
  chatId,
}: {
  item: TChat;
  onClick: (id: string) => void;
  chatId: string;
}) => {
  const lastMessage = item?.message?.text || "Нет сообщений";
  const isActive = chatId === item.id;

  return (
    <Card
      shadow="sm"
      padding="sm"
      onClick={() => onClick(item.id)}
      bg={isActive ? "blue" : "gray"}
      style={{
        cursor: "pointer",
        backgroundColor: isActive ? "#f3f3f3" : "#fff",
        transition: "background 0.2s ease-in-out",
        borderRadius: 8,
      }}
    >
      <Flex align="center" gap="md">
        <Box style={{ flexGrow: 1, overflow: "hidden" }}>
          <Text size="md" truncate>
            {item.name || "Индивидуальный чат"}
          </Text>
          <Text size="md" truncate>
            {item.interlocutors.map((it) => it.firstName)}
          </Text>
          <Text size="sm" color={"white"} truncate>
            {lastMessage}
          </Text>
        </Box>
      </Flex>
    </Card>
  );
};

export default ChatItem;
