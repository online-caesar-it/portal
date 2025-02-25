import { Button, Flex, Textarea } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";

const SendMessageForm = ({
  sendMessage,
}: {
  chatId: string;
  sendMessage: (value: string) => void;
}) => {
  const form = useForm({
    initialValues: {
      message: "",
    },
  });

  const onSubmit = () => {
    sendMessage(form.values.message);
    form.reset();
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      onSubmit();
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <Flex align={"center"} gap={10}>
        <Textarea
          radius={"sm"}
          minRows={1}
          autosize
          flex={1}
          {...form.getInputProps("message")}
          placeholder="Напишите сообщение..."
          onKeyDown={handleKeyPress}
        />
        <Button
          radius={"sm"}
          type={"submit"}
          disabled={!form.values.message.trim()}
          onClick={onSubmit}
        >
          Отправить
        </Button>
      </Flex>
    </form>
  );
};

export default SendMessageForm;
