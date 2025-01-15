import { Button, Flex, Loader, Text, TextInput } from "@mantine/core";
import { useState } from "react";
import { useQueryMyChats } from "~/entities/chat/hooks/useQueryMyChats";
import If from "~/shared/lib/components/if";
import List from "~/shared/lib/components/list";
import ChatCreate from "./chat-create";
import ChatItem from "~/features/chat/chat-item";
import Chat from "./chat";

const ChatsList = () => {
  const { chats, isLoading } = useQueryMyChats();
  const [isVisibleChat, setIsVisibleChat] = useState(false);
  const [chatId, setChatId] = useState("");
  const [show, setShow] = useState(false);
  const handleOpenChat = (id: string) => {
    setIsVisibleChat(true);
    setChatId(id);
  };
  return (
    <Flex h={"100vh"} w={"100%"} align={"start"} gap={60}>
      <Flex w={"30%"} direction={"column"} gap={10}>
        <Button w={"100%"} onClick={() => setShow(true)}>
          Создать чат
        </Button>
        <TextInput placeholder="Имя фамилия" />

        <If when={!isLoading} elseComponent={<Loader />}>
          <If
            when={Array.isArray(chats?.data) && chats.data?.length > 0}
            elseComponent={<Text>Чатов не найдено</Text>}
          >
            <List list={chats?.data || []}>
              {(item) => <ChatItem item={item} onClick={handleOpenChat} />}
            </List>
          </If>
        </If>
        <ChatCreate setShow={setShow} show={show} />
      </Flex>
      <If when={isVisibleChat}>
        <Chat chatId={chatId} />
      </If>
    </Flex>
  );
};

export default ChatsList;
