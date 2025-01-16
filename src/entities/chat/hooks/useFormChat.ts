import { chatApi } from "../api/chat.api";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@mantine/form";

export const useFormChat = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      userIds: [],
      name: "",
      description: "",
      type: "",
    },
  });

  const { mutate } = useMutation({
    mutationKey: ["create-chat"],
    mutationFn: () => {
      return chatApi.createChat(form.getValues());
    },
  });
  const submit = () => {
    mutate();
  };
  return { submit, form };
};
