import { useQueryEducator } from "~/entities/educator/hooks/use-query-educator";
import { Card, Avatar, Text, Group, Stack, Loader } from "@mantine/core";
import List from "~/shared/lib/components/list";
import If from "~/shared/lib/components/if";
import ButtonCreate from "~/features/educator/ui/button-create";

const EducatorList = ({ toggle }: { toggle: () => void }) => {
  const { data: educators, isLoading } = useQueryEducator();
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
            {(educator) => (
              <Card
                key={educator.id}
                shadow="sm"
                padding="md"
                radius="md"
                withBorder
              >
                <Group>
                  <Avatar src={educator.avatar} radius="xl" size="lg" />
                  <Stack gap={2}>
                    <Text size="lg">{educator.firstName}</Text>
                    <Text size="sm" color="dimmed">
                      {educator.config.email}
                    </Text>
                  </Stack>
                </Group>
              </Card>
            )}
          </List>
        </If>
      </If>
    </Stack>
  );
};

export default EducatorList;
