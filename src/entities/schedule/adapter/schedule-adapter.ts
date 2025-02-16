import { TWorkingDays } from "~/shared/types/schedule-type";
type TAdapterWorkingDays = {
  value: string;
  label: string;
};
const adapterScheduleWorkingDays = (
  workingDays: TWorkingDays[]
): TAdapterWorkingDays[] => {
  return workingDays?.map((it) => ({
    value: String(it.dayNumber),
    label: it.dayName,
  }));
};
export const scheduleAdapter = {
  adapterScheduleWorkingDays,
};
