import { AppShell, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router";
import SignOut from "~/features/auth/ui/sign-out";
import { useCheckedAuth } from "~/shared/hooks/useCheckedAuth";
import Sidebar from "~/widgets/navbar/ui/navbar";

const MainLayout = () => {
  const [opened, { toggle }] = useDisclosure();
  useCheckedAuth();

  return (
    <div>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <div>Logo</div>
        </AppShell.Header>

        <AppShell.Navbar p="md">
          <Sidebar />
          <SignOut />
        </AppShell.Navbar>

        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </div>
  );
};

export default MainLayout;
