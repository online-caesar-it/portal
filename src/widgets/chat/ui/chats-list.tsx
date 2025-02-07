import { Flex, Loader, Text, TextInput } from "@mantine/core";
import { useCallback, useState } from "react";
import { useQueryMyChats } from "~/entities/chat/hooks/useQueryMyChats";
import If from "~/shared/lib/components/if";
import List from "~/shared/lib/components/list";
import ChatItem from "~/features/chat/chat-item";
import Chat from "./chat";
import { debounce } from "lodash";

const ChatsList = () => {
  const { chats, isLoading, searchString, setSearchString } = useQueryMyChats();
  const [localSearch, setLocalSearch] = useState(searchString);
  const [isVisibleChat, setIsVisibleChat] = useState(false);
  const [chatId, setChatId] = useState("");

  const handleOpenChat = (id: string) => {
    setIsVisibleChat(true);
    setChatId(id);
  };

  const debouncedHandler = useCallback(
    debounce((value: string) => {
      setSearchString(value);
    }, 500),
    [setSearchString]
  );

  const handleInputChange = (value: string) => {
    setLocalSearch(value);
    debouncedHandler(value);
  };

  return (
    <Flex w="100%" align="start" gap={60}>
      <Flex
        w="30%"
        direction="column"
        gap={10}
        h="100%"
        style={{ overflowY: "auto" }}
      >
        <TextInput
          value={localSearch}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder="Имя фамилия"
        />
        <If when={!isLoading} elseComponent={<Loader />}>
          <If
            when={Array.isArray(chats?.data) && chats.data?.length > 0}
            elseComponent={<Text>Чатов не найдено</Text>}
          >
            <List list={chats?.data || []}>
              {(item) => (
                <ChatItem
                  chatId={chatId}
                  item={item}
                  onClick={handleOpenChat}
                />
              )}
            </List>
          </If>
        </If>
      </Flex>
      <If when={isVisibleChat}>
        <Chat
          chatId={chatId}
          chat={chats?.data.find((it) => it.id === chatId)}
        />
      </If>
    </Flex>
  );
};

export default ChatsList;
