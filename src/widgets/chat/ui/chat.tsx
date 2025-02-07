import { Flex } from "@mantine/core";

import { useSession } from "~/shared/hooks/useSession";

import SendMessageForm from "~/features/message/ui/send-message-form";
import MessageList from "~/features/message/ui/message-list";
import { useHandlerMessageWs } from "~/entities/chat/hooks/useHandlerMessageWs";
import MessageTopPanel from "~/features/message/ui/message-top-panel";
import { TChat } from "~/shared/types/chat-type";
import { useSearchMessages } from "~/entities/chat/hooks/useSearchMessages";

const Chat = ({ chatId, chat }: { chatId: string; chat?: TChat }) => {
  const { messages, sendMessage, isLoading, getNextPage, newMessageReceived } =
    useHandlerMessageWs(chatId);
  const { setSearch, search } = useSearchMessages(chatId);
  const { session } = useSession();

  const handleOnEnd = async () => {
    await getNextPage();
  };

  return (
    <Flex flex={1} h={"90vh"} direction={"column"} justify={"space-between"}>
      <MessageTopPanel chat={chat} search={search} setSearch={setSearch} />
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
