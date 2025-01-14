import { ReactNode } from "react";
import If from "~/shared/lib/components/if";
import List from "~/shared/lib/components/list";
import { TUser } from "~/shared/types/user-type";

const StudentList = ({
  students,
  render,
}: {
  students?: TUser[];
  render?: (item: TUser) => ReactNode;
}) => {
  return (
    <If
      when={Array.isArray(students) && students.length > 0}
      elseComponent={<></>}
    >
      <List list={students || []}>{(item) => render && render(item)}</List>
    </If>
  );
};

export default StudentList;
