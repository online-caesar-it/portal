import { EScheduleStatus } from "../enums/schedule-enum";

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
  userId: string;
  createdAt: string;
  directionId: string;
};
