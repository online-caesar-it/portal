import { useMutation, useQueryClient } from "@tanstack/react-query";
import { directionApi } from "../api/direction.api";
import { TDirection } from "~/shared/types/direction-type";

export const useMutateDirection = ({
  setDirectionId,
  toggle,
}: {
  setDirectionId: (id: string) => void;
  toggle: () => void;
}) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["create-direction"],
    mutationFn: directionApi.createDirection,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["get-all-direction"] });
      setDirectionId(data.id);
      toggle();
    },
  });
  const submit = (values: Omit<TDirection, "id">) => {
    mutate({
      ...values,
      duration: values.duration.split(" ")[0],
    });
  };
  return {
    submit,
    isPending,
  };
};
