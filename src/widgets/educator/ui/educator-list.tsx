import { queryEducator } from "~/entities/educator/hooks/use-query-educator";
import { Text, Group, Stack, Loader } from "@mantine/core";
import List from "~/shared/lib/components/list";
import If from "~/shared/lib/components/if";
import ButtonCreate from "~/features/educator/ui/button-create";
import UserCard from "~/features/user/ui/user-card";

const EducatorList = ({ toggle }: { toggle: () => void }) => {
  const { data: educators, isLoading } = queryEducator.useGetEducators();
  return (
    <Stack gap={"md"}>
      <Group>
        <Text size="xl">Список преподавателей</Text>
        <ButtonCreate toggle={toggle} />
      </Group>
      <If
        when={!isLoading}
        elseComponent={
          <Group>
            <Loader color="blue" />
          </Group>
        }
      >
        <If
          when={educators && educators?.length > 0}
          elseComponent={<Text>Преподавателей пока нет</Text>}
        >
          <List list={educators ?? []}>
            {(educator) => <UserCard user={educator} />}
          </List>
        </If>
      </If>
    </Stack>
  );
};

export default EducatorList;
