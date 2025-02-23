import { Button, Flex, Text } from "@mantine/core";
import { useQueryStudents } from "~/entities/student/hooks/useQueryMyStudents";
import UserCard from "~/features/user/ui/user-card";
import List from "~/shared/lib/components/list";
import { TUser } from "~/shared/types/user-type";

const StudentList = ({
  handleClick,
}: {
  handleClick: (user: TUser) => void;
}) => {
  const { data } = useQueryStudents({
    offset: 0,
    limit: 1,
  });

  return (
    <Flex gap={"xl"} direction={"column"}>
      <Text size={"xl"}>Студенты, которые прошли регистрацию на сайте</Text>
      <List list={data ?? []}>
        {(user) => (
          <UserCard
            render={() => (
              <Button onClick={() => handleClick(user)}>
                Привязать направление
              </Button>
            )}
            user={user}
          />
        )}
      </List>
    </Flex>
  );
};

export default StudentList;
