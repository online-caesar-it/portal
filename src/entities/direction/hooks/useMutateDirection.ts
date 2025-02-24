import { useMutation, useQueryClient } from "@tanstack/react-query";
import { directionApi } from "../api/direction.api";
import {
  TDirection,
  TDirectionAttachedUser,
} from "~/shared/types/direction-type";

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
export const useAttachUserToDirection = (onSuccess: () => void) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ["attach-user-to-direction"],
    mutationFn: directionApi.attachUserToDirection,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-students"] });
      onSuccess();
    },
  });
  const submit = (values: TDirectionAttachedUser) => {
    mutate(values);
  };
  return {
    submit,
    isPending,
  };
};
