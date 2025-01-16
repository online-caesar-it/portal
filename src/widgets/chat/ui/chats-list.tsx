import { Button, Flex, Loader, Text, TextInput } from "@mantine/core";
import { useCallback, useState } from "react";
import { useQueryMyChats } from "~/entities/chat/hooks/useQueryMyChats";
import If from "~/shared/lib/components/if";
import List from "~/shared/lib/components/list";
import ChatItem from "~/features/chat/chat-item";
import Chat from "./chat";
import VisibleForRoles from "~/shared/lib/components/visible-for-roles";
import { RoleEnum } from "~/shared/enums/role-enum";
import ChatCreateByEducatorModal from "./chat-create-by-educator-modal";
import { debounce } from "lodash";

const ChatsList = () => {
  const { chats, isLoading, searchString, setSearchString } = useQueryMyChats();
  const [localSearch, setLocalSearch] = useState(searchString);
  const [isVisibleChat, setIsVisibleChat] = useState(false);
  const [chatId, setChatId] = useState("");
  const [show, setShow] = useState(false);

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
    <Flex h={"100vh"} w={"100%"} align={"start"} gap={60}>
      <Flex w={"30%"} direction={"column"} gap={10}>
        <VisibleForRoles roles={[RoleEnum.EDUCATOR]}>
          <Button w={"100%"} onClick={() => setShow(true)}>
            Создать чат
          </Button>
        </VisibleForRoles>
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
              {(item) => <ChatItem item={item} onClick={handleOpenChat} />}
            </List>
          </If>
        </If>
        <VisibleForRoles roles={[RoleEnum.EDUCATOR]}>
          <ChatCreateByEducatorModal setShow={setShow} show={show} />
        </VisibleForRoles>
      </Flex>
      <If when={isVisibleChat}>
        <Chat chatId={chatId} />
      </If>
    </Flex>
  );
};

export default ChatsList;
