import { Button, Flex, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { queryEducator } from "~/entities/educator/hooks/use-query-educator";
import DirectionSelect from "~/features/direction/ui/direction-select";
import { input } from "~/shared/lib/input";
import { validators } from "~/shared/lib/validators";
type TAdapterData = {
  value: string;
  label: string;
};
const FormCreateEducator = ({ directions }: { directions: TAdapterData[] }) => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      user: {
        email: "",
        phone_number: "",
        firstName: "",
        surname: "",
        patronymic: "",
      },
      directionIds: [],
    },
    validate: {
      user: {
        firstName: (value) =>
          value.trim().length === 0 ? "Поле имя обязательно" : null,
        surname: (value) =>
          value.trim().length === 0 ? "Поле фамилия обязательно" : null,
        email: (value) =>
          validators.validateEmail(value) ? null : "Введите корректный email",
        phone_number: (value) =>
          /^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/.test(value)
            ? null
            : "Введите телефон в формате +7 (999) 999-99-99",
      },
      directionIds: (value) =>
        value.length > 0 ? null : "Выберите хотя бы одно направление",
    },
  });
  const { submit } = queryEducator.useCreateEducator();

  return (
    <form onSubmit={form.onSubmit(submit)}>
      <Flex direction={"column"} gap={"lg"}>
        <TextInput
          withAsterisk
          label="Имя"
          placeholder="Введите имя"
          {...form.getInputProps("user.firstName")}
        />
        <TextInput
          label="Фамилия"
          withAsterisk
          placeholder="Введите фамилию"
          {...form.getInputProps("user.surname")}
        />
        <TextInput
          label="Отчество"
          placeholder="Введите отчество"
          {...form.getInputProps("user.patronymic")}
        />
        <TextInput
          label="Email"
          withAsterisk
          placeholder="Введите email"
          type="email"
          {...form.getInputProps("user.email")}
        />
        <TextInput
          label="Телефон"
          withAsterisk
          placeholder="+7 (999) 999-99-99"
          value={form.getValues().user.phone_number}
          onChange={(e) => {
            const maskedValue = input.telephoneInputMask(e.target.value);
            form.setFieldValue("user.phone_number", maskedValue);
          }}
        />
        <DirectionSelect form={form} data={directions} />
      </Flex>
      <Button type="submit" fullWidth mt="lg">
        Создать преподавателя
      </Button>
    </form>
  );
};

export default FormCreateEducator;
