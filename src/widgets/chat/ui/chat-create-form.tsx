import { Group, Button, Radio } from "@mantine/core";
import StudentList from "~/features/student/ui/student-list";
import { useChatByEducator } from "../hooks/useChatByEducator";
import { TUser, TUserRoleType } from "~/shared/types/user-type";
const ChatCreateForm = ({
  students,
  role,
  close,
}: {
  students?: TUser[];
  role: TUserRoleType;
  close: () => void;
}) => {
  const {
    selectedStudentId,
    submit,
    isCreateDisabled,
    handleSelectStudent,
    filteredStudents,
    studentsWithChats,
  } = useChatByEducator(close, students);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (selectedStudentId) {
          submit();
        }
      }}
    >
      <Group>
        <StudentList
          students={filteredStudents}
          render={(student) => {
            const isDisabled = studentsWithChats.includes(student.id);

            return (
              <Radio
                key={student.id}
                label={`${role === "student" ? "Преподаватель" : "Студент"} ${
                  student.firstName
                } ${student.surname}`}
                value={student.id}
                checked={selectedStudentId === student.id}
                disabled={isDisabled}
                onChange={() => handleSelectStudent(student.id)}
              />
            );
          }}
        />
      </Group>
      <Button
        mt={15}
        radius={"lg"}
        w={"100%"}
        type={"submit"}
        disabled={isCreateDisabled || !selectedStudentId}
      >
        Создать чат
      </Button>
    </form>
  );
};

export default ChatCreateForm;
