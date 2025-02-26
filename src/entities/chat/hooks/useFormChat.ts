import { chatApi } from "../api/chat.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "@mantine/form";

export const useFormChat = (onSuccess: () => void) => {
  const queryClient = useQueryClient();
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-my-chats"] });
      onSuccess();
    },
  });
  const submit = () => {
    mutate();
  };
  return { submit, form };
};
