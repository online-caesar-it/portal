import { EScheduleStatus } from "../enums/schedule-enum";
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
  workingDays: TWorkingDays;
  timeIntervals: TWorkingTime[];
};
export type TScheduleWithDirection = TScheduleDate & {
  directionId: string;
};
