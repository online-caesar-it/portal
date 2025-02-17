import { useQuery } from "@tanstack/react-query";
import { scheduleApi } from "../api/schedule.api";
import { TSchedule, TScheduleDate } from "~/shared/types/schedule-type";

const useGetWorkingDays = () => {
  const { data, isPending } = useQuery({
    queryKey: ["get-working-days"],
    queryFn: scheduleApi.getWorkingDays,
  });
  return {
    data,
    isPending,
  };
};
const useGetSchedule = (params: TScheduleDate) => {
  const { data, isLoading } = useQuery<TSchedule[]>({
    queryKey: ["get-schedule", params],
    queryFn: () => scheduleApi.getSchedule(params),
  });
  return {
    data,
    isLoading,
  };
};
export const querySchedule = {
  useGetWorkingDays,
  useGetSchedule,
};
