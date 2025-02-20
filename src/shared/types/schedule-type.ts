import { EScheduleStatus } from "../enums/schedule-enum";
import { TUser } from "./user-type";

export type TWorkingDays = {
  dayName: string;
  dayNumber: number;
};
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
  educator: TUser;
  students: TUser[];
  userId: string;
  createdAt: string;
  directionId: string;
};
