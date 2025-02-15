import { Button, TextInput, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";

const SendMessageForm = ({
  chatId,
  sendMessage,
}: {
  chatId: string;
  sendMessage: (chatId: string, value: string) => void;
}) => {
  const form = useForm({
    initialValues: {
      message: "",
    },
  });
  return (
    <form
      onSubmit={form.onSubmit((value) => {
        sendMessage(chatId, value.message);
        form.reset();
      })}
    >
      <Flex gap={10}>
        <TextInput
          radius={"lg"}
          flex={1}
          {...form.getInputProps("message")}
          placeholder="Напишите сообщение..."
        />
        <Button
          radius={"lg"}
          type={"submit"}
          disabled={!form.values.message.trim()}
        >
          Отправить
        </Button>
      </Flex>
    </form>
  );
};

export default SendMessageForm;
