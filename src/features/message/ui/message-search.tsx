import { Card, Flex, Loader, Text, TextInput } from "@mantine/core";
import { CiSearch } from "react-icons/ci";
import If from "~/shared/lib/components/if";
import List from "~/shared/lib/components/list";
import { TSearchMessageType } from "~/shared/types/chat-type";

const MessageSearch = ({
  value,
  onChange,
  messages,
  isLoading,
}: {
  value: string;
  onChange: (value: string) => void;
  messages?: TSearchMessageType[];
  isLoading: boolean;
}) => {
  return (
    <Flex direction={"column"} align="stretch" style={{ width: "100%" }}>
      <TextInput
        leftSection={<CiSearch />}
        placeholder={"Поиск..."}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        radius="md"
        size="lg"
      />

      <Flex direction="column" gap={12} mt={"lg"}>
        <If when={!isLoading} elseComponent={<Loader />}>
          <If when={messages && messages?.length > 0}>
            <List list={messages ?? []}>
              {({ text, interlocutor }) => (
                <Card>
                  <Text size={"sm"}>{text}</Text>
                  <Text>Отправитель: {interlocutor.firstName}</Text>
                </Card>
              )}
            </List>
          </If>
        </If>
      </Flex>
    </Flex>
  );
};

export default MessageSearch;
