import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { userApi } from "~/shared/api/user.api";
import { TEducatorCreate } from "~/shared/types/user-type";

const useGetEducators = () => {
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
const useCreateEducator = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["create-educator"],
    mutationFn: userApi.createEducator,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-educator"] });
    },
  });
  const submit = (values: TEducatorCreate) => {
    mutate(values);
  };
  return {
    submit,
    isPending,
  };
};
export const queryEducator = {
  useGetEducators,
  useCreateEducator,
};
