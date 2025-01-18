import { Flex, TextInput, Button, Loader, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutationCreateModule } from "~/entities/module/hooks/useMutationCreateModule";
import If from "~/shared/lib/components/if";

const ModuleForm = ({
  directionId,
  toggle,
}: {
  directionId: string;
  toggle: () => void;
}) => {
  const form = useForm({
    initialValues: {
      directionId,
      name: "",
      description: "",
    },
    validate: {
      name: (value) =>
        value.trim().length === 0 ? "Поле Имя обязательно" : null,
      description: (value) =>
        value.trim().length === 0 ? "Поле Описание обязательно" : null,
    },
  });
  const { submit, isPending } = useMutationCreateModule({
    toggle,
  });
  return (
    <form onSubmit={form.onSubmit((values) => submit(values))}>
      <Flex mt={"lg"} direction={"column"} w={"100%"}>
        <Text>Создание модуля</Text>
        <Flex direction={"column"} w={"100%"} gap={"lg"}>
          <TextInput
            withAsterisk
            label={"Имя"}
            placeholder="Введите имя модуля"
            {...form.getInputProps("name")}
          />
          <TextInput
            withAsterisk
            label={"Описание"}
            placeholder="Введите описание модуля"
            {...form.getInputProps("description")}
          />
          <Button type={"submit"}>
            <If when={!isPending} elseComponent={<Loader />}>
              <Text>Создать</Text>
            </If>
          </Button>
        </Flex>
      </Flex>
    </form>
  );
};

export default ModuleForm;
