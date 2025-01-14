import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api/user.api";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { TUser } from "../types/user-type";
export const useSession = () => {
  const router = useNavigate();
  const { data, isLoading, error } = useQuery<{ data: TUser }>({
    queryKey: ["get-self"],
    queryFn: userApi.getSelf,
  });
  console.log(data?.data);
  useEffect(() => {
    if (error?.status === 400) {
      router("/auth/sign-in");
    }
  }, [error]);
  return { session: data, isLoading };
};
