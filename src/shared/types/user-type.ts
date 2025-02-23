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
export type TEducatorCreate = {
  user: {
    phone_number: string;
    email: string;
    firstName: string;
    surname: string;
    patronymic: string;
  };
  directionIds: number[];
};
export type TParamsPage = {
  limit: number;
  offset: number;
};
