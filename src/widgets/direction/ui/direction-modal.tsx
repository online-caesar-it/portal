import { Modal } from "@mantine/core";
import DirectionForm from "~/features/direction/ui/direction-form";
import ModuleForm from "~/features/module/ui/module-form";
import If from "~/shared/lib/components/if";

const DirectionModal = ({
  opened,
  closed,
  setDirectionId,
  visibleDialogDirection,
  visibleDialogModule,
  directionId,
}: {
  opened: boolean;
  closed: () => void;
  setDirectionId: (id: string) => void;
  visibleDialogDirection: () => void;
  visibleDialogModule: () => void;
  directionId: string;
}) => {
  return (
    <Modal
      opened={opened}
      onClose={closed}
      radius={"lg"}
      title={"Создание направления"}
    >
      <DirectionForm
        directionId={directionId}
        toggle={visibleDialogDirection}
        setDirectionId={setDirectionId}
      />
      <If when={directionId}>
        <ModuleForm toggle={visibleDialogModule} directionId={directionId} />
      </If>
    </Modal>
  );
};

export default DirectionModal;
