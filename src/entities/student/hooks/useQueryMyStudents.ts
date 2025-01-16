import { useQuery } from "@tanstack/react-query";
import { TUser } from "~/shared/types/user-type";
import { studentApi } from "../api/student.api";
import { useState } from "react";

export const useQueryMyStudents = () => {
  const [search, setSearch] = useState("");
  const { data: students, isLoading } = useQuery<{ data: TUser[] }>({
    queryKey: ["get-my-students", search],
    queryFn: () => studentApi.getMyStudents(search),
  });
  return { students, isLoading, search, setSearch };
};
