import { api } from "~/shared/api/api";
import { TSchedule, TScheduleDate } from "~/shared/types/schedule-type";
const getWorkingDays = async () => {
  const { data } = await api.get("/schedule/working-days/get");
  return data;
};
const createSchedule = async () => {};

const getSchedule = async (
  params: TScheduleDate
): Promise<{ data: TSchedule[] }> => {
  const { data } = await api.get(
    `/schedule/get?startDate=${params.startDate}&endDate=${params.endDate}`
  );
  return data;
};
export const scheduleApi = {
  getWorkingDays,
  createSchedule,
  getSchedule,
};
