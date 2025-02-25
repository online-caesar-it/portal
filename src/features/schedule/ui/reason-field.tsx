import { TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

type TReasonFieldProps<T> = {
  form: UseFormReturnType<T>;
};

const ReasonField = <T,>({ form }: TReasonFieldProps<T>) => {
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
