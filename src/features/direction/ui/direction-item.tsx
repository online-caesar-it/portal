import { Button, Card, Flex, Text } from "@mantine/core";
import { TDirection } from "~/shared/types/direction-type";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router";
const DirectionItem = ({ item }: { item: TDirection }) => {
  const router = useNavigate();
  return (
    <Card radius={"lg"} w={"100%"} bg={"gray"}>
      <Flex justify={"space-between"} align={"center"}>
        <Flex direction={"column"}>
          <Text>{item.name}</Text>
          <Text color={"blue"}>{item.description}</Text>
        </Flex>
        <Button
          onClick={() => router(`/admin/module/${item.id}`)}
          rightSection={<FaArrowRight />}
          variant="light"
        >
          К модулям
        </Button>
      </Flex>
    </Card>
  );
};

export default DirectionItem;
