import { api } from "~/shared/api/api";
const getWorkingDays = async () => {
  const { data } = await api.get("/schedule/working-days/get");
  return data;
};
export const scheduleApi = {
  getWorkingDays,
};
