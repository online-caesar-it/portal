import { Loader } from "@mantine/core";
import { useCheckedAuth } from "~/shared/hooks/useCheckedAuth";
import { useSession } from "~/shared/hooks/useSession";
import If from "~/shared/lib/components/if";

const Main = () => {
  const { session, isLoading } = useSession();
  useCheckedAuth();

  return (
    <If when={isLoading}>
      <Loader />
    </If>
  );
};

export default Main;
