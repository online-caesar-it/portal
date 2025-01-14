import { TUser } from "../types/user-type";
import { api } from "./api";

const getSelf = async (): Promise<{ data: TUser }> => {
  return await api.get("/user/getSelf");
};

export const userApi = { getSelf };
