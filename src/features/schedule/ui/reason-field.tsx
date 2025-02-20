import { TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

type ReasonFieldProps<T> = {
  form: UseFormReturnType<T>;
};

const ReasonField = <T,>({ form }: ReasonFieldProps<T>) => {
  return (
    <TextInput
      label="Причина переноса"
      placeholder="Болею"
      {...form.getInputProps("reason")}
      withAsterisk
    />
  );
};

export default ReasonField;
