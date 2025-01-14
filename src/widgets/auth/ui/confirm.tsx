import { Card, Text } from "@mantine/core";
import { useConfirm } from "../hooks/useConfirm";
import If from "~/shared/lib/components/if";

const Confirm = () => {
  const { message, loading } = useConfirm();
  return (
    <Card>
      <If when={loading}>
        <Text>{message}</Text>
      </If>
    </Card>
  );
};

export default Confirm;
