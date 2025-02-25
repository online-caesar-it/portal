import { useDisclosure } from "@mantine/hooks";
import EducatorDrawerForm from "~/widgets/educator/ui/educator-drawer-form";
import EducatorList from "~/widgets/educator/ui/educator-list";

const EducatorPage = () => {
  const [opened, { toggle, close }] = useDisclosure();
  return (
    <>
      <EducatorList toggle={toggle} />
      <EducatorDrawerForm onClose={close} open={opened} />
    </>
  );
};

export default EducatorPage;
