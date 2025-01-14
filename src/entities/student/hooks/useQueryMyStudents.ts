import { useQuery } from "@tanstack/react-query";
import { TUser } from "~/shared/types/user-type";
import { studentApi } from "../api/student.api";

export const useQueryMyStudents = () => {
  const { data: students, isLoading } = useQuery<{ data: TUser[] }>({
    queryKey: ["get-my-students"],
    queryFn: studentApi.getMyStudents,
    queryHash: "15m",
  });
  return { students, isLoading };
};
