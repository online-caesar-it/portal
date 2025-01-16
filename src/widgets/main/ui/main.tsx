import { Loader } from "@mantine/core";
import { useSession } from "~/shared/hooks/useSession";
import If from "~/shared/lib/components/if";

const Main = () => {
  const { isLoading } = useSession();

  return (
    <If when={isLoading}>
      <Loader />
    </If>
  );
};

export default Main;
