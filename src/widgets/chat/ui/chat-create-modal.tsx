import { Modal, Flex, Loader } from "@mantine/core";

import If from "~/shared/lib/components/if";
import ChatCreateForm from "./chat-create-form";
import { useGetUsersByMyDirection } from "~/entities/direction/hooks/useQueryDirection";
import { useSession } from "~/shared/hooks/useSession";

const ChatCreateModal = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: (value: boolean) => void;
}) => {
  const { session } = useSession();
  const { data, isLoading } = useGetUsersByMyDirection();
  // const [localSearch, setLocalSearch] = useState(search);
  // const debouncedHandler = useCallback(
  //   debounce((value: string) => {
  //     setSearch(value);
  //   }, 300),
  //   [setSearch]
  // );

  // const handleInputChange = (value: string) => {
  //   setLocalSearch(value);
  //   debouncedHandler(value);
  // };
  return (
    <Modal
      radius={"lg"}
      opened={show}
      onClose={() => setShow(false)}
      title="Выберите студента"
    >
      <Flex w={"100%"} direction={"column"} gap={10}>
        {/* <TextInput
          radius={"lg"}
          value={localSearch}
          onChange={(e) => handleInputChange(e.target.value)}
          label="Найти студента"
          placeholder="Поиск"
        /> */}
        <If when={!isLoading} elseComponent={<Loader />}>
          <ChatCreateForm
            close={() => setShow(false)}
            students={data?.filter((it) => it.id !== session?.data.id)}
            role={session?.data?.role ?? "student"}
          />
        </If>
      </Flex>
    </Modal>
  );
};

export default ChatCreateModal;
