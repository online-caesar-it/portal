import {
  EScheduleStatus,
  EScheduleTransferStatus,
} from "../enums/schedule-enum";
import { TUser } from "./user-type";

export type TScheduleDate = {
  startDate: string;
  endDate: string;
};
export type TSchedule = {
  id: string;
  dateLesson: string;
  lessonId: string | null;
  groupId: string | null;
  startTime: string;
  endTime: string;
  status: EScheduleStatus;
  educator?: TUser;
  students: TUser[];
  userId: string;
  createdAt: string;
  directionId: string;
};
export type TWorkingDays = number[];
export type TWorkingTime = {
  startTime: string;
  endTime: string;
};
export type TScheduleMove = {
  newEndTime: string;
  newStartTime: string;
  newDateLesson: string;
  reason: string;
  scheduleId: string;
};
export type TScheduleCreate = {
  workingDays: {
    day: number;
    timeIntervals: {
      startTime: string;
      endTime: string;
    }[];
  }[];
};
export type TScheduleCreateFormatted = {
  workingDays: TWorkingDays;
  intervalsByDay: TWorkingTime[];
};
export type TScheduleWithDirection = TScheduleDate & {
  directionId: string;
};
export type TScheduleAttach = {
  scheduleId: string;
};
export type TScheduleWithFilters = Pick<TUser, "id"> & TScheduleDate;
export type TScheduleByStatus = {
  status: EScheduleTransferStatus;
};
export type TScheduleRequest = {
  educator: TUser;
  id: string;
  reason: string;
  status: EScheduleTransferStatus;
};
export type TScheduleTransferUpdate = {
  scheduleTransferId: string;
  status: EScheduleTransferStatus;
};
