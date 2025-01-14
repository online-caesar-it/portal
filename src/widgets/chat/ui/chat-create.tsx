import { Modal, Group, TextInput, Flex, Button, Radio } from "@mantine/core";
import { useFormChat } from "~/entities/chat/hooks/useFormChat";
import { useQueryMyStudents } from "~/entities/student/hooks/useQueryMyStudents";
import StudentList from "~/features/student/ui/student-list";
import { useSession } from "~/shared/hooks/useSession";

const ChatCreate = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: (value: boolean) => void;
}) => {
  const { students } = useQueryMyStudents();
  const { form, submit } = useFormChat();
  const { session } = useSession();
  console.log(session?.data);
  const setValue = (id?: string) => {
    form.setFieldValue("userIds", [session?.data.id as never, id as never]);
  };
  console.log(form.getValues().userIds);
  return (
    <Modal
      opened={show}
      onClose={() => setShow(false)}
      title="Выберите студентов"
    >
      <Flex w={"100%"} direction={"column"} gap={10}>
        <TextInput label="Найти студента" placeholder="Поиск" />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <Group>
            <StudentList
              students={students?.data}
              render={(student) => (
                <Radio
                  key={student?.id}
                  label={`Студент ${student?.firstName} ${student.surname}`}
                  value={student?.id}
                  checked={form
                    .getValues()
                    .userIds.includes(student?.id as never)}
                  onChange={() => setValue(student?.id || "")}
                />
              )}
            />
          </Group>
          <Button mt={15} w={"100%"} type={"submit"}>
            Создать чат
          </Button>
        </form>
      </Flex>
    </Modal>
  );
};

export default ChatCreate;
