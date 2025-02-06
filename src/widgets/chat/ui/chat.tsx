import { Flex } from "@mantine/core";

import { useSession } from "~/shared/hooks/useSession";

import SendMessageForm from "~/features/message/ui/send-message-form";
import MessageList from "~/features/message/ui/message-list";
import { useHandlerMessageWs } from "~/entities/chat/hooks/useHandlerMessageWs";

const Chat = ({ chatId }: { chatId: string }) => {
  const { messages, sendMessage, isLoading, getNextPage, newMessageReceived } =
    useHandlerMessageWs(chatId);
  const { session } = useSession();

  const handleOnEnd = async () => {
    await getNextPage();
  };

  return (
    <Flex flex={1} h={"90vh"} direction={"column"} justify={"space-between"}>
      <MessageList
        handleOnEnd={handleOnEnd}
        user={session?.data}
        messages={messages.reverse()}
        isLoading={isLoading}
        newMessageReceived={newMessageReceived}
      />
      <SendMessageForm chatId={chatId} sendMessage={sendMessage} />
    </Flex>
  );
};

export default Chat;
