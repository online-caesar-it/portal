import { useDisclosure } from "@mantine/hooks";
import EducatorCreateForm from "~/widgets/educator/ui/educator-create-form";
import EducatorList from "~/widgets/educator/ui/educator-list";

const EducatorPage = () => {
  const [opened, { toggle, close }] = useDisclosure();
  return (
    <>
      <EducatorList toggle={toggle} />
      <EducatorCreateForm onClose={close} open={opened} />
    </>
  );
};

export default EducatorPage;
