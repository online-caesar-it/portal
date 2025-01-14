import {
  Button,
  Card,
  Center,
  Flex,
  Notification,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { authApi } from "~/shared/api/auth.api";
import If from "~/shared/lib/components/if";

const AuthForm = () => {
  const [isVisibleNotification, setIsVisibleNotification] = useState(false);
  const form = useForm<{ email: string }>({
    mode: "uncontrolled",
    initialValues: {
      email: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Не верный email"),
    },
  });
  const onSubmit = async (values: { email: string }) => {
    setIsVisibleNotification(true);
    await authApi.loginByEmail(values);
  };
  return (
    <Flex direction={"column"} align={"center"} w={"100%"} gap={50}>
      <If when={isVisibleNotification} elseComponent={<></>}>
        <Notification
          w={"60%"}
          top={0}
          onClose={() => setIsVisibleNotification(false)}
          title={"Успешно"}
          color={"teal"}
        >
          Сообщение было отправлено на почту {form.getValues().email}
        </Notification>
      </If>
      <Card w={"60%"}>
        <Center>
          <Text fw={700} size="xl" c="blue">
            Вход
          </Text>
        </Center>

        <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <Button type="submit" color="blue" fullWidth mt="md" radius="md">
            Войти
          </Button>
        </form>
      </Card>
    </Flex>
  );
};

export default AuthForm;
