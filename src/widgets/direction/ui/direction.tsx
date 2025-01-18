import { Button, Dialog, Flex, Loader, Text } from "@mantine/core";
import { useQueryDirection } from "~/entities/direction/hooks/useQueryDirection";
import If from "~/shared/lib/components/if";
import DirectionList from "./direction-list";
import { useDisclosure } from "@mantine/hooks";
import DirectionModal from "./direction-modal";
import { useState } from "react";

const Direction = () => {
  const { data, isLoading } = useQueryDirection();
  const [opened, { toggle, close }] = useDisclosure();
  const [directionId, setDirectionId] = useState("");
  const [dialogVisible, setDialogVisible] = useState({
    isShow: false,
    text: "",
  });
  const handleClose = () => {
    setDialogVisible({
      isShow: false,
      text: "",
    });
  };
  return (
    <If when={!isLoading} elseComponent={<Loader />}>
      <Flex w={"40%"} direction={"column"}>
        <Button w={"60%"} size={"md"} onClick={toggle} variant={"gradient"}>
          Создать направление
        </Button>
        <DirectionList direction={data} />
      </Flex>
      <DirectionModal
        visibleDialogDirection={() =>
          setDialogVisible({
            isShow: true,
            text: "Новое направление создан успешно",
          })
        }
        visibleDialogModule={() => {
          setDialogVisible({
            isShow: true,
            text: "Новый модуль создан успешно",
          });
          close();
          setDirectionId("");
        }}
        opened={opened}
        setDirectionId={setDirectionId}
        closed={close}
        directionId={directionId}
      />
      <Dialog
        opened={dialogVisible.isShow}
        withCloseButton
        onClose={handleClose}
      >
        <Text>{dialogVisible.text}</Text>
      </Dialog>
    </If>
  );
};

export default Direction;
