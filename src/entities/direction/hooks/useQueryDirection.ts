import { useQuery } from "@tanstack/react-query";
import { directionApi } from "../api/direction.api";
import { userApi } from "~/shared/api/user.api";

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
export const useQueryMyDirection = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["my-direction"],
    queryFn: directionApi.getMyDirection,
  });
  return {
    data,
    isLoading,
  };
};
export const useGetUsersByMyDirection = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["get-users-by-my-direction"],
    queryFn: userApi.getUserByMyDirection,
  });
  return {
    data,
    isLoading,
  };
};
