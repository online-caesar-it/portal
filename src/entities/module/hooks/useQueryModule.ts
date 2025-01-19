import { useQuery } from "@tanstack/react-query";
import { moduleApi } from "../api/module.api";
import { TModuleResponse } from "~/shared/types/module-type";

export const useQueryModule = (id: string) => {
  const { data, isLoading } = useQuery<TModuleResponse>({
    queryKey: ["get-module"],
    queryFn: () => moduleApi.getModules(id),
  });
  return {
    data,
    isLoading,
  };
};
