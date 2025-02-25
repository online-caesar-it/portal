import { Flex, Modal, ScrollArea } from "@mantine/core";
import { useSession } from "~/shared/hooks/useSession";
// import SendMessageForm from "~/features/message/ui/send-message-form";
import MessageList from "~/features/message/ui/message-list";
import { useHandlerMessageWs } from "~/entities/chat/hooks/useHandlerMessageWs";
import MessageTopPanel from "~/features/message/ui/message-top-panel";
import { TChat } from "~/shared/types/chat-type";
import { useSearchMessages } from "~/entities/chat/hooks/useSearchMessages";
import { debounce } from "lodash";
import { useState, useCallback } from "react";
import { useDisclosure } from "@mantine/hooks";
import MessageSearch from "~/features/message/ui/message-search";
import SendMessageForm from "~/features/message/ui/send-message-form";

const Chat = ({ chatId, chat }: { chatId: string; chat?: TChat }) => {
  const { messages, isLoading, sendMessage, getNextPage } =
    useHandlerMessageWs(chatId);
  const { setSearch, search, messagesSearch, isMessagesSearchLoading } =
    useSearchMessages(chatId);
  const { session } = useSession();
  const [opened, { toggle, close }] = useDisclosure();
  const handleOnEnd = async () => {
    await getNextPage();
  };
  const [localSearch, setLocalSearch] = useState(search);
  const debouncedHandler = useCallback(
    debounce((value: string) => {
      setSearch(value);
    }, 500),
    [setSearch]
  );

  const handleInputChange = (value: string) => {
    setLocalSearch(value);
    debouncedHandler(value);
  };
  return (
    <Flex flex={1} h={"90vh"} direction={"column"} className={"overflow-auto"}>
      <MessageTopPanel toggle={toggle} chat={chat} />
      <MessageList
        handleOnEnd={handleOnEnd}
        user={session?.data}
        messages={messages.reverse()}
        isLoading={isLoading}
        newMessageReceived={false}
      />
      <SendMessageForm chatId={chatId} sendMessage={sendMessage} />
      <Modal title={"Введите ключевое слово"} opened={opened} onClose={close}>
        <ScrollArea>
          <MessageSearch
            value={localSearch}
            onChange={handleInputChange}
            messages={messagesSearch}
            isLoading={isMessagesSearchLoading}
          />
        </ScrollArea>
      </Modal>
    </Flex>
  );
};

export default Chat;
