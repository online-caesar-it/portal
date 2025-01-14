type TRoleUserType = "user" | "admin";
export type TUserConfig = {
  email: string;
  id: string;
  userId: string;
  phone_number: string;
  refresh_token: string;
};
export type TUser = {
  id: string;
  firstName: string;
  surname: string;
  patronymic: string;
  role: TRoleUserType;
  groupId?: string;
  config: TUserConfig;
};
