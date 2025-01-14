import { Button, Flex, TextInput } from "@mantine/core";
import { useState } from "react";
import { useQueryMyChats } from "~/entities/chat/hooks/useQueryMyChats";
import If from "~/shared/lib/components/if";
import List from "~/shared/lib/components/list";
import ChatCreate from "./chat-create";

const ChatsList = () => {
  const { chats, isLoading } = useQueryMyChats();

  const [show, setShow] = useState(false);

  return (
    <Flex w={"30%"} direction={"column"} gap={10}>
      <Button w={"100%"} onClick={() => setShow(true)}>
        Создать чат
      </Button>
      <TextInput placeholder="Имя фамилия" />

      <If
        when={Array.isArray(chats) && chats?.length > 0}
        elseComponent={<></>}
      >
        <List list={chats || []}>{(item) => <>{item.name}</>}</List>
      </If>
      <ChatCreate setShow={setShow} show={show} />
    </Flex>
  );
};

export default ChatsList;
