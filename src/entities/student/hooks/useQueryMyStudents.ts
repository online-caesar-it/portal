import { useQuery } from "@tanstack/react-query";
import { TParamsPage, TUser } from "~/shared/types/user-type";
import { studentApi } from "../api/student.api";
import { useState } from "react";
import { userApi } from "~/shared/api/user.api";

export const useQueryMyStudents = () => {
  const [search, setSearch] = useState("");
  const { data: students, isLoading } = useQuery<{ data: TUser[] }>({
    queryKey: ["get-my-students", search],
    queryFn: () => studentApi.getMyStudents(search),
  });
  return { students, isLoading, search, setSearch };
};
export const useQueryStudents = (params: TParamsPage) => {
  const { data, isLoading } = useQuery({
    queryKey: ["get-students", params],
    queryFn: () => userApi.getStudents(params),
  });
  return {
    data,
    isLoading,
  };
};
