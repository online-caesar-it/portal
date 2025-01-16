import { api } from "~/shared/api/api";
import { TUser } from "~/shared/types/user-type";

const getMyStudents = async (search: string): Promise<{ data: TUser[] }> => {
  return await api.get(`/direction/students-by-educator?search=${search}`);
};
export const studentApi = {
  getMyStudents,
};
