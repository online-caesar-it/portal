import { useQueryMyStudents } from "~/entities/student/hooks/useQueryMyStudents";
import StudentList from "~/features/student/ui/student-list";

const StudentsBlock = () => {
  const { students } = useQueryMyStudents();
  return <StudentList students={students?.data} />;
};

export default StudentsBlock;
