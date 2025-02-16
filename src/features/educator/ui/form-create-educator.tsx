import { Button, Flex, MultiSelect, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { queryEducator } from "~/entities/educator/hooks/use-query-educator";
import { input } from "~/shared/lib/input";
import { validators } from "~/shared/lib/validators";
type TAdapterData = {
  value: string;
  label: string;
};
const FormCreateEducator = ({
  workingDays,
  directions,
}: {
  workingDays: TAdapterData[];
  directions: TAdapterData[];
}) => {
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
      workingDays: [],
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
      workingDays: (value) =>
        value.length > 0 ? null : "Выберите хотя бы один рабочий день",
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
            console.log(maskedValue);
            form.setFieldValue("user.phone_number", maskedValue);
          }}
        />
        <MultiSelect
          label="Рабочие дни"
          withAsterisk
          placeholder="Выберите рабочие дни"
          data={workingDays}
          {...form.getInputProps("workingDays")}
        />
        <MultiSelect
          label="Направления"
          withAsterisk
          placeholder="Выберите направления"
          data={directions}
          {...form.getInputProps("directionIds")}
        />
      </Flex>
      <Button type="submit" fullWidth mt="lg">
        Создать преподавателя
      </Button>
    </form>
  );
};

export default FormCreateEducator;
