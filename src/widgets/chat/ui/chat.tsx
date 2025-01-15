import { Flex } from "@mantine/core";
import { useWebSocketChat } from "~/shared/hooks/useWebSocket";
import { useSession } from "~/shared/hooks/useSession";

import SendMessageForm from "~/features/message/ui/send-message-form";
import MessageList from "~/features/message/ui/message-list";

const Chat = ({ chatId }: { chatId: string }) => {
  const { messages, sendMessage, isLoading, getNextPage } =
    useWebSocketChat(chatId);
  const { session } = useSession();

  const handleOnEnd = () => {
    void getNextPage();
  };

  return (
    <Flex flex={1} h={"90%"} direction={"column"} justify={"space-between"}>
      <MessageList
        handleOnEnd={handleOnEnd}
        user={session?.data}
        messages={messages.reverse()}
        isLoading={isLoading}
      />

      <SendMessageForm chatId={chatId} sendMessage={sendMessage} />
    </Flex>
  );
};

export default Chat;
