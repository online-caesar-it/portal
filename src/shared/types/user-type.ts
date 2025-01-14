type TRoleUserType = "user" | "admin";

export type TUser = {
  id: string;
  firstName: string;
  surname: string;
  patronymic: string;
  role: TRoleUserType;
};
