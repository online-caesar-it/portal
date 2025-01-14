import { api } from "~/shared/api/api";
import { TUser } from "~/shared/types/user-type";

const getMyStudents = async (): Promise<{ data: TUser[] }> => {
  return await api.get("/direction/students-by-educator");
};
export const studentApi = {
  getMyStudents,
};
