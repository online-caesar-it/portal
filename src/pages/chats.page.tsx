import { Flex } from "@mantine/core";
import Chat from "~/widgets/chat/ui/chat";
import ChatsList from "~/widgets/chat/ui/chats-list";

const ChatsPage = () => {
  return (
    <Flex>
      <ChatsList />
      <Chat />
    </Flex>
  );
};

export default ChatsPage;
