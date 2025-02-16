import { useQuery } from "@tanstack/react-query";
import { scheduleApi } from "../api/schedule.api";

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

export const querySchedule = {
  useGetWorkingDays,
};
