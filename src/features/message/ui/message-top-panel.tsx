import { Button, Flex, Text } from "@mantine/core";
import List from "~/shared/lib/components/list";
import { TChat } from "~/shared/types/chat-type";
import { CiSearch } from "react-icons/ci";
import If from "~/shared/lib/components/if";

const MessageTopPanel = ({
  chat,
  toggle,
}: {
  chat?: TChat;
  toggle: () => void;
}) => {
  return (
    <Flex
      className={"rounded-lg"}
      direction="row"
      py={"sm"}
      px={"lg"}
      bg={"gray"}
      align={"center"}
      justify={"space-between"}
    >
      <Flex direction="column" className="space-y-2">
        <If when={chat?.interlocutors && chat?.interlocutors.length > 0}>
          <Text size="lg" className="text-white font-semibold">
            Количество участников: {chat?.interlocutors.length || 0 + 1}
          </Text>
        </If>
        <List list={chat?.interlocutors ?? []}>
          {({ firstName, surname }) => (
            <Text className="text-white truncate">
              {firstName} {surname}
            </Text>
          )}
        </List>
      </Flex>
      <Button
        onClick={toggle}
        variant={"filled"}
        bg={"blue"}
        leftSection={<CiSearch />}
      >
        <Text>Поиск по сообщениям</Text>
      </Button>
    </Flex>
  );
};

export default MessageTopPanel;
