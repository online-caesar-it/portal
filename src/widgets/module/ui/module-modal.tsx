import { Modal } from "@mantine/core";
import ModuleForm from "~/features/module/ui/module-form";

const ModuleModal = ({
  directionId,
  opened,
  closed,
}: {
  directionId: string;
  opened: boolean;
  closed: () => void;
}) => {
  return (
    <Modal
      opened={opened}
      onClose={closed}
      radius={"lg"}
      title={"Создание модуля"}
    >
      <ModuleForm toggle={closed} directionId={directionId} />
    </Modal>
  );
};

export default ModuleModal;
