import { Button, Modal, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { directionAdapter } from "~/entities/direction/adapter/direction-adapter";
import { useAttachUserToDirection } from "~/entities/direction/hooks/useMutateDirection";
import { useQueryDirection } from "~/entities/direction/hooks/useQueryDirection";
import DirectionSelect from "~/features/direction/ui/direction-select";
import { TUser } from "~/shared/types/user-type";

const StudentForm = ({
  close,
  opened,
  user,
}: {
  close: () => void;
  opened: boolean;
  user?: TUser;
}) => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      userId: "",
      directionIds: [],
    },
    validate: {
      directionIds: (value) =>
        value.length > 0 ? null : "Выберите хотя бы одно направление",
    },
  });
  const { data } = useQueryDirection();
  const { submit } = useAttachUserToDirection(close);
  useEffect(() => {
    form.setFieldValue("userId", user?.id ?? "");
  }, [user]);
  return (
    <Modal
      title={"Привязать направления к студенту"}
      opened={opened}
      onClose={close}
    >
      <Text>
        Привязывайте направление только к тем студентам, которые оплатили нужное
        направление
      </Text>
      <form className={"mt-4"} onSubmit={form.onSubmit(submit)}>
        <DirectionSelect
          data={directionAdapter.adapterDirection(data ?? [])}
          form={form}
        />
        <Button fullWidth type={"submit"} mt={"lg"} variant={"light"}>
          Привязать направления
        </Button>
      </form>
    </Modal>
  );
};

export default StudentForm;
