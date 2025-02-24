import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { TUser } from "~/shared/types/user-type";
import StudentForm from "~/widgets/student/ui/student-form";
import StudentList from "~/widgets/student/ui/student-list";

const StudentsPage = () => {
  const [opened, { toggle, close }] = useDisclosure();
  const [userSelect, setUserSelect] = useState<TUser>();
  const handleCLick = (user: TUser) => {
    toggle();
    setUserSelect(user);
  };
  return (
    <>
      <StudentList handleClick={handleCLick} />
      <StudentForm opened={opened} close={close} user={userSelect} />
    </>
  );
};

export default StudentsPage;
