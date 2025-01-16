import { useSession } from "~/shared/hooks/useSession";
import If from "./if";
import { ReactNode } from "react";
import { RoleEnum } from "~/shared/enums/role-enum";

const VisibleForRoles = ({
  roles,
  children,
}: {
  roles: RoleEnum[];
  children: ReactNode;
}) => {
  const { session } = useSession();
  return (
    <If when={roles.includes(session?.data.role || RoleEnum.EDUCATOR)}>
      {children}
    </If>
  );
};

export default VisibleForRoles;
