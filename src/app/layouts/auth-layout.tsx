import { Flex } from "@mantine/core";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <Flex justify={"center"} align={"center"} h={"100vh"}>
      <Outlet />
    </Flex>
  );
};

export default AuthLayout;
