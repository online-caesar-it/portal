export type TUserRoleType = "admin" | "educator" | "student";
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
  role: TUserRoleType;
  groupId?: string;
  config: TUserConfig;
  avatar: string;
};
export type TWorkingDays = number[];
export type TEducatorCreate = {
  user: TUser;
  workingDays: TWorkingDays;
};
