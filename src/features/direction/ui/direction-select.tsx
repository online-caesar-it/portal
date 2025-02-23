import { MultiSelect } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
type TAdapterData = {
  value: string;
  label: string;
};
type TDirectionSelectProps<T> = {
  form: UseFormReturnType<T>;
  data: TAdapterData[];
};

const DirectionSelect = <T,>({ form, data }: TDirectionSelectProps<T>) => {
  return (
    <MultiSelect
      label="Направления"
      withAsterisk
      placeholder="Выберите направления"
      data={data}
      {...form.getInputProps("directionIds")}
    />
  );
};

export default DirectionSelect;
