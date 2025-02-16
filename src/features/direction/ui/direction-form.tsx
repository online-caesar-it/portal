import { Button, Flex, Loader, Select, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutateDirection } from "~/entities/direction/hooks/useMutateDirection";

import If from "~/shared/lib/components/if";
const durationData = [
  "1 месяц",
  "3 месяца",
  "6 месяцев",
  "9 месяцев",
  "12 месяцев",
];
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
      price: "",
      duration: "",
    },
    validate: {
      name: (value) =>
        value.trim().length === 0 ? "Поле Имя обязательно" : null,
      description: (value) =>
        value.trim().length === 0 ? "Поле Описание обязательно" : null,
      price: (value) =>
        value.trim().length === 0 ? "Поле прайс обязательно" : null,
      duration: (value) =>
        value.trim().length === 0 ? "Поле период обязательно" : null,
    },
  });
  const { submit, isPending } = useMutateDirection({
    setDirectionId,
    toggle,
  });
  return (
    <form onSubmit={form.onSubmit((values) => submit(values))}>
      <Flex direction={"column"} gap={"lg"} w={"100%"}>
        <TextInput
          disabled={!!directionId}
          withAsterisk
          label={"Наименование"}
          placeholder="Введите Наименование направления"
          {...form.getInputProps("name")}
        />
        <TextInput
          disabled={!!directionId}
          withAsterisk
          label={"Описание"}
          placeholder="Введите описание направления"
          {...form.getInputProps("description")}
        />
        <TextInput
          disabled={!!directionId}
          withAsterisk
          label={"Стоимость"}
          placeholder="Введите стоимость направления"
          {...form.getInputProps("price")}
        />
        <Select
          disabled={!!directionId}
          label={"Продолжительность курса"}
          placeholder={"Выберите из списка"}
          data={durationData}
          withAsterisk
          {...form.getInputProps("duration")}
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
