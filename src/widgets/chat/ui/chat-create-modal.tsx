import { Modal, TextInput, Flex, Loader } from "@mantine/core";

import { useQueryMyStudents } from "~/entities/student/hooks/useQueryMyStudents";
import { debounce } from "lodash";
import { useCallback, useState } from "react";
import If from "~/shared/lib/components/if";
import ChatCreateForm from "./chat-create-form";

const ChatCreateModal = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: (value: boolean) => void;
}) => {
  const { search, setSearch, isLoading, students } = useQueryMyStudents();
  const [localSearch, setLocalSearch] = useState(search);
  const debouncedHandler = useCallback(
    debounce((value: string) => {
      setSearch(value);
    }, 300),
    [setSearch]
  );

  const handleInputChange = (value: string) => {
    setLocalSearch(value);
    debouncedHandler(value);
  };
  return (
    <Modal
      radius={"lg"}
      opened={show}
      onClose={() => setShow(false)}
      title="Выберите студента"
    >
      <Flex w={"100%"} direction={"column"} gap={10}>
        <TextInput
          radius={"lg"}
          value={localSearch}
          onChange={(e) => handleInputChange(e.target.value)}
          label="Найти студента"
          placeholder="Поиск"
        />
        <If when={!isLoading} elseComponent={<Loader />}>
          <ChatCreateForm students={students?.data} />
        </If>
      </Flex>
    </Modal>
  );
};

export default ChatCreateModal;
