import { Button, Flex, TextInput } from "@mantine/core";

const ChatsList = () => {
  return (
    <Flex w={"30%"} direction={"column"} gap={10}>
      <Button w={"100%"}>Создать чат</Button>
      <TextInput placeholder="Имя фамилия" />
    </Flex>
  );
};

export default ChatsList;
