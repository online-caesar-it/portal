import { Card, Text } from "@mantine/core";
import List from "~/shared/lib/components/list";
import { TChat } from "~/shared/types/chat-type";

const ChatItem = ({
  item,
  onClick,
}: {
  item: TChat;
  onClick: (id: string) => void;
}) => {
  return (
    <Card onClick={() => onClick(item.id)}>
      {item.name || "Индивидуальный чат"}
      <List list={item.interlocutors}>
        {(item) => <Text>{item.firstName}</Text>}
      </List>
    </Card>
  );
};

export default ChatItem;
