import { useMutation } from "@tanstack/react-query";
import { moduleApi } from "../api/module.api";
import { TModule } from "~/shared/types/module-type";

export const useMutationCreateModule = ({ toggle }: { toggle: () => void }) => {
  const { mutate, isPending } = useMutation({
    mutationKey: ["create-module"],
    mutationFn: moduleApi.create,
    onSuccess: () => {
      toggle();
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
