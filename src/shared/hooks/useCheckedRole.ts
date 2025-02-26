import { useNavigate } from "react-router";
import { useSession } from "./useSession";
import { RoleEnum } from "../enums/role-enum";

export const useCheckedRoleAdmin = () => {
  const router = useNavigate();
  const { session } = useSession();
  if (session?.data.role !== RoleEnum.ADMIN) router("/");
};
