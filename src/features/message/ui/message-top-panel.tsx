import { Flex, Text, TextInput } from "@mantine/core";
import List from "~/shared/lib/components/list";
import { TChat } from "~/shared/types/chat-type";
import { CiSearch } from "react-icons/ci";
const MessageTopPanel = ({
  chat,
  search,
  setSearch,
}: {
  chat?: TChat;
  search: string;
  setSearch: (value: string) => void;
}) => {
  return (
    <Flex
      style={{
        borderRadius: 12,
      }}
      align={"center"}
      justify={"space-between"}
      bg={"blue"}
      py={"sm"}
      px={"lg"}
    >
      <Flex direction={"column"}>
        <Text size={"lg"}>
          Количество участников: {chat?.interlocutors.length}
        </Text>
        <List list={chat?.interlocutors ?? []}>
          {({ firstName, surname }) => (
            <Text truncate>
              {firstName} {surname}
            </Text>
          )}
        </List>
      </Flex>
      <TextInput
        value={search}
        variant={"outline"}
        onChange={(e) => setSearch(e.target.value)}
        leftSection={<CiSearch />}
        placeholder={"Поиск по сообщениям"}
      />
    </Flex>
  );
};

export default MessageTopPanel;
