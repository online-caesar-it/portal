import { Flex } from "@mantine/core";
import DirectionItem from "~/features/direction/ui/direction-item";
import List from "~/shared/lib/components/list";
import { TDirection } from "~/shared/types/direction-type";

const DirectionList = ({ direction }: { direction?: TDirection[] }) => {
  return (
    <Flex mt={"20px"} direction={"column"} gap={"xl"}>
      <List list={direction || []}>
        {(item) => <DirectionItem item={item} />}
      </List>
    </Flex>
  );
};

export default DirectionList;
