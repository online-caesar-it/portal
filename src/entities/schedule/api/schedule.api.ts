import { api } from "~/shared/api/api";
import {
  TSchedule,
  TScheduleCreate,
  TScheduleDate,
  TScheduleMove,
} from "~/shared/types/schedule-type";
const getWorkingDays = async () => {
  const { data } = await api.get("/schedule/working-days/get");
  return data;
};
const createSchedule = async (body: TScheduleCreate) => {
  const { data } = await api.post("/schedule/create", body);
  return data;
};

const getSchedule = async (params: TScheduleDate): Promise<TSchedule[]> => {
  const { data } = await api.get(
    `/schedule/get?startDate=${params.startDate}&endDate=${params.endDate}`
  );
  return data;
};
const sendScheduleTransfer = async (body: TScheduleMove) => {
  const { data } = await api.post("/schedule/transfer/create", body);
  return data;
};
const sendScheduleCancel = async (body: Pick<TScheduleMove, "reason">) => {
  const { data } = await api.post("/schedule/cancel/create", body);
  return data;
};
export const scheduleApi = {
  getWorkingDays,
  createSchedule,
  getSchedule,
  sendScheduleCancel,
  sendScheduleTransfer,
};
