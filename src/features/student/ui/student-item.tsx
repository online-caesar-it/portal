import { Flex } from "@mantine/core";
import { ReactNode } from "react";
import { TUser } from "~/shared/types/user-type";

const StudentItem = ({
  item,
  render,
}: {
  item: TUser;
  render?: (item?: TUser) => ReactNode;
}) => {
  return (
    <Flex align={"center"} gap={10}>
      {item.firstName} {render && render(item)}
    </Flex>
  );
};

export default StudentItem;
