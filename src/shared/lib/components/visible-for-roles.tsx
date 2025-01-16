import { useSession } from "~/shared/hooks/useSession";
import If from "./if";
import { ReactNode } from "react";
import { TUserRoleType } from "~/shared/types/user-type";

const VisibleForRoles = ({
  roles,
  children,
}: {
  roles: TUserRoleType[];
  children: ReactNode;
}) => {
  const { session } = useSession();
  return (
    <If when={roles.includes(session?.data.role || "student")}>{children}</If>
  );
};

export default VisibleForRoles;
