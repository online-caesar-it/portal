import { useQuery } from "@tanstack/react-query";
import { userApi } from "~/shared/api/user.api";

export const useQueryEducator = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["get-educator"],
    queryFn: userApi.getEducators,
    queryHash: "15m",
  });
  return {
    data,
    isLoading,
  };
};
