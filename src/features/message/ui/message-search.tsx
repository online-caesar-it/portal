import { Flex, Input, Text } from "@mantine/core";
import List from "~/shared/lib/components/list";
import { TSearchMessageType } from "~/shared/types/chat-type";

const MessageSearch = ({
  value,
  onChange,
  messages,
}: {
  value: string;
  onChange: (value: string) => void;
  messages?: TSearchMessageType[];
}) => {
  return (
    <Flex direction={"column"}>
      <Input
        placeholder={"Поиск..."}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {/* <List list={messages}>{{}}</List> */}
    </Flex>
  );
};

export default MessageSearch;
