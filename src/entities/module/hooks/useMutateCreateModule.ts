import { useMutation, useQueryClient } from "@tanstack/react-query";
import { moduleApi } from "../api/module.api";
import { TModule } from "~/shared/types/module-type";

export const useMutateCreateModule = ({ toggle }: { toggle: () => void }) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-module"],
    mutationFn: moduleApi.create,
    onSuccess: () => {
      toggle();
      queryClient.invalidateQueries({ queryKey: ["get-module"] });
    },
  });
  const submit = (values: Omit<TModule, "id">) => {
    mutate(values);
  };
  return {
    submit,
    isPending,
  };
};
