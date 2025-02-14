import { Button, Flex, Loader, Text } from "@mantine/core";
import { useParams } from "react-router";
import { useQueryModule } from "~/entities/module/hooks/useQueryModule";
import If from "~/shared/lib/components/if";
import ModuleList from "./module-list";
import { useDisclosure } from "@mantine/hooks";
import ModuleModal from "./module-modal";

const Module = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useQueryModule(id as string);

  const [opened, { toggle, close }] = useDisclosure();
  return (
    <If when={!isLoading} elseComponent={<Loader />}>
      <Text>Направление: {data?.direction?.name}</Text>
      <Flex w={"40%"} direction={"column"}>
        <Button w={"60%"} size={"md"} onClick={toggle} variant={"gradient"}>
          Создать модуль
        </Button>
        <If
          when={Array.isArray(data?.modules) && data?.modules.length > 0}
          elseComponent={<Text>Вы еще не добавили модулей</Text>}
        >
          <ModuleList list={data?.modules || []} />
        </If>
        <ModuleModal opened={opened} closed={close} directionId={id || ""} />
      </Flex>
    </If>
  );
};

export default Module;
