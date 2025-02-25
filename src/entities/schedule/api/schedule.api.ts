import { api } from "~/shared/api/api";
import {
  TSchedule,
  TScheduleAttach,
  TScheduleByStatus,
  TScheduleCreate,
  TScheduleDate,
  TScheduleMove,
  TScheduleRequest,
  TScheduleTransferUpdate,
  TScheduleWithDirection,
  TScheduleWithFilters,
} from "~/shared/types/schedule-type";
import { TUser } from "~/shared/types/user-type";
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
const getScheduleByDirection = async (
  params: TScheduleWithDirection
): Promise<
  {
    educator: TUser;
    schedule: TSchedule[];
  }[]
> => {
  const { data } = await api.get(
    `/schedule/get-by-direction?directionId=${params.directionId}&startDate=${params.startDate}&endDate=${params.endDate}`
  );
  return data;
};
const attachedStudentToSchedule = async (body: TScheduleAttach) => {
  const { data } = await api.post("/schedule/attach-student", body);
  return data;
};
const getScheduledFilter = async (
  params: TScheduleWithFilters
): Promise<TSchedule[]> => {
  const { data } = await api.get(
    `/schedule/get/filter?startDate=${params.startDate}&endDate=${params.endDate}&userId=${params.id}`
  );
  return data;
};
const getScheduleTransfer = async (
  params: TScheduleByStatus
): Promise<TScheduleRequest[]> => {
  const { data } = await api.get(
    `/schedule/transfer/by-status?status=${params.status}`
  );
  return data;
};
const getScheduleCancel = async (
  params: TScheduleByStatus
): Promise<TScheduleRequest[]> => {
  const { data } = await api.get(
    `/schedule/cancel/by-status?status=${params.status}`
  );
  return data;
};
const updateTransferSchedule = async (body: TScheduleTransferUpdate) => {
  const { data } = await api.put("/schedule/transfer/update", body);
  return data;
};
const updateCancelSchedule = async (body: TScheduleTransferUpdate) => {
  const { data } = await api.put("/schedule/cancel/update", body);
  return data;
};
export const scheduleApi = {
  getWorkingDays,
  createSchedule,
  getSchedule,
  sendScheduleCancel,
  sendScheduleTransfer,
  getScheduleByDirection,
  attachedStudentToSchedule,
  getScheduledFilter,
  getScheduleTransfer,
  getScheduleCancel,
  updateTransferSchedule,
  updateCancelSchedule,
};
