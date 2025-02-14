import { Card, Flex, Button, Text } from "@mantine/core";
import { FaArrowRight } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { TModule } from "~/shared/types/module-type";

const ModuleItem = ({ item }: { item: TModule }) => {
  const router = useNavigate();
  return (
    <Card radius={"lg"} w={"100%"} bg={"gray"}>
      <Flex justify={"space-between"} align={"center"}>
        <Flex direction={"column"}>
          <Text>{item.name}</Text>
          <Text color={"blue"}>{item.description}</Text>
        </Flex>
        <Button
          onClick={() => router(`/admin/lesson/${item.id}`)}
          rightSection={<FaArrowRight />}
          variant="light"
        >
          К урокам
        </Button>
      </Flex>
    </Card>
  );
};

export default ModuleItem;
