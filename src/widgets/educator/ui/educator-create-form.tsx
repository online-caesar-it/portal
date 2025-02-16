import { Drawer } from "@mantine/core";

const EducatorCreateForm = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer
      onClose={onClose}
      opened={open}
      title={"Добавление преподавателя"}
      position={"right"}
    ></Drawer>
  );
};

export default EducatorCreateForm;
