import {
  Button,
  Card,
  Center,
  Flex,
  Notification,
  Text,
  TextInput,
  Loader,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { authApi } from "~/shared/api/auth.api";
import If from "~/shared/lib/components/if";

const AuthForm = () => {
  const [notification, setNotification] = useState<{
    visible: boolean;
    message: string;
    type: "success" | "error";
  }>({
    visible: false,
    message: "",
    type: "success",
  });

  const form = useForm<{ email: string }>({
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Некорректный email"),
    },
  });

  const { mutate: login, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: authApi.loginByEmail,
    onSuccess: () => {
      setNotification({
        visible: true,
        message: `Сообщение успешно отправлено на почту ${
          form.getValues().email
        }`,
        type: "success",
      });
    },
    onError: (error: Error) => {
      if (axios.isAxiosError(error) && error.response) {
        setNotification({
          visible: true,
          message: error.response.data?.message || "Ошибка сервера",
          type: "error",
        });
      } else {
        setNotification({
          visible: true,
          message: "Произошла неизвестная ошибка. Попробуйте позже.",
          type: "error",
        });
      }
    },
  });

  const onSubmit = (values: { email: string }) => {
    login(values);
  };

  return (
    <Flex direction="column" align="center" w="100%" gap={50}>
      <If when={notification.visible}>
        <Notification
          w="60%"
          top={10}
          onClose={() =>
            setNotification({ visible: false, message: "", type: "success" })
          }
          title={notification.type === "success" ? "Успешно" : "Ошибка"}
          color={notification.type === "success" ? "teal" : "red"}
        >
          {notification.message}
        </Notification>
      </If>
      <Card w="60%">
        <Center>
          <Text fw={700} size="xl" c="blue">
            Вход
          </Text>
        </Center>

        <form onSubmit={form.onSubmit(onSubmit)}>
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            {...form.getInputProps("email")}
            disabled={isPending}
          />
          <Button
            type="submit"
            color="blue"
            fullWidth
            mt="md"
            radius="md"
            disabled={isPending}
          >
            {isPending ? <Loader size="sm" color="white" /> : "Войти"}
          </Button>
        </form>
      </Card>
    </Flex>
  );
};

export default AuthForm;
