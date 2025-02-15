import { Button, Flex, Textarea } from "@mantine/core";
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
      <Flex align={"center"} gap={10}>
        <Textarea
          radius={"lg"}
          minRows={1}
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
