import { TEducatorCreate, TParamsPage, TUser } from "../types/user-type";
import { api } from "./api";

const getSelf = async (): Promise<{ data: TUser }> => {
  return await api.get("/user/getSelf");
};
const getEducators = async (): Promise<TUser[]> => {
  const { data } = await api.get("/user/educator/get-all");
  return data;
};
const createEducator = async (body: TEducatorCreate) => {
  const { data } = await api.post("/user/educator/create", body);
  return data;
};
const getStudents = async (params: TParamsPage): Promise<TUser[]> => {
  const { data } = await api.get<TUser[]>(
    `/user/student/get-all?limit=${params.limit}&offset=${params.offset}`
  );
  return data;
};
const getUserByMyDirection = async (): Promise<TUser[]> => {
  const { data } = await api.get("/user/direction/get-all");
  return data;
};

export const userApi = {
  getSelf,
  getEducators,
  createEducator,
  getStudents,
  getUserByMyDirection,
};
