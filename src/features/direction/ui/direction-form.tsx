import { Button, Flex, Loader, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutateCreateDirection } from "~/entities/direction/hooks/useMutateCreateDirection";

import If from "~/shared/lib/components/if";

const DirectionForm = ({
  setDirectionId,
  toggle,
  directionId,
}: {
  setDirectionId: (id: string) => void;
  toggle: () => void;
  directionId: string;
}) => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
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
  const { submit, isPending } = useMutateCreateDirection({
    setDirectionId,
    toggle,
  });
  return (
    <form onSubmit={form.onSubmit((values) => submit(values))}>
      <Flex direction={"column"} gap={"lg"} w={"100%"}>
        <TextInput
          disabled={!!directionId}
          withAsterisk
          label={"Имя"}
          placeholder="Введите имя направления"
          {...form.getInputProps("name")}
        />
        <TextInput
          disabled={!!directionId}
          withAsterisk
          label={"Описание"}
          placeholder="Введите описание направления"
          {...form.getInputProps("description")}
        />
        <Button disabled={!!directionId} type={"submit"}>
          <If when={!isPending} elseComponent={<Loader />}>
            <Text>Создать</Text>
          </If>
        </Button>
      </Flex>
    </form>
  );
};

export default DirectionForm;
