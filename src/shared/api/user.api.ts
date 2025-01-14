import { TUser } from "../types/user-type";
import { api } from "./api";

const getSelf = async () => {
  const { data } = await api.get<TUser>("/user/getSelf");
  return data;
};

export const userApi = { getSelf };
