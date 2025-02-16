import { useQuery } from "@tanstack/react-query";
import { directionApi } from "../api/direction.api";

export const useQueryDirection = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["get-all-direction"],
    queryFn: directionApi.getAllDirection,
  });
  return {
    data,
    isLoading,
  };
};
