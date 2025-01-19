import { Flex } from "@mantine/core";
import ModuleItem from "~/features/module/ui/module-item";
import List from "~/shared/lib/components/list";
import { TModule } from "~/shared/types/module-type";

const ModuleList = ({ list }: { list: TModule[] }) => {
  return (
    <Flex mt={"20px"} direction={"column"} gap={"xl"}>
      <List list={list || []}>{(item) => <ModuleItem item={item} />}</List>
    </Flex>
  );
};

export default ModuleList;
