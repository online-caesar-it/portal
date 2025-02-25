import { Drawer } from "@mantine/core";
import { directionAdapter } from "~/entities/direction/adapter/direction-adapter";
import { useQueryDirection } from "~/entities/direction/hooks/useQueryDirection";
import FormCreateEducator from "~/features/educator/ui/form-create-educator";

const EducatorDrawerForm = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { data } = useQueryDirection();
  return (
    <Drawer
      size={"xl"}
      onClose={onClose}
      opened={open}
      title={"Добавление преподавателя"}
      position={"right"}
    >
      <FormCreateEducator
        directions={directionAdapter.adapterDirection(data ?? [])}
      />
    </Drawer>
  );
};

export default EducatorDrawerForm;
