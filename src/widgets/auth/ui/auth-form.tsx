import { Button, Card, Center, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";

const AuthForm = () => {
  const form = useForm<{ email: string }>({
    mode: "uncontrolled",
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Не верный email"),
    },
  });

  return (
    <Card w={"60%"}>
      <Center>
        <Text fw={700} size="xl" c="blue">
          Вход
        </Text>
      </Center>

      <form
        onSubmit={form.onSubmit((values) => {
          console.log(values);
        })}
      >
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          key={form.key("email")}
          {...form.getInputProps("email")}
        />
      </form>

      <Button type="submit" color="blue" fullWidth mt="md" radius="md">
        Войти
      </Button>
    </Card>
  );
};

export default AuthForm;
