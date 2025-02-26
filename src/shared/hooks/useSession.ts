import { useQuery } from "@tanstack/react-query";
import { userApi } from "../api/user.api";
import { TUser } from "../types/user-type";
export const useSession = () => {
  const { data, isLoading, error } = useQuery<{ data: TUser }>({
    queryKey: ["get-self"],
    queryFn: userApi.getSelf,
  });
  console.log(error);
  // useEffect(() => {
  //   if (error?.status === 400) {
  //     router("/auth/sign-in");
  //   }
  // }, [error]);
  return { session: data, isLoading };
};
