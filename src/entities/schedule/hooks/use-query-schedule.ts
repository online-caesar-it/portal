import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { scheduleApi } from "../api/schedule.api";
import {
  TSchedule,
  TScheduleCreate,
  TScheduleDate,
  TScheduleMove,
  TScheduleWithDirection,
} from "~/shared/types/schedule-type";
import { AxiosError } from "axios";

const useGetWorkingDays = () => {
  const { data, isPending } = useQuery({
    queryKey: ["get-working-days"],
    queryFn: scheduleApi.getWorkingDays,
  });
  return {
    data,
    isPending,
  };
};
const useGetSchedule = (params: TScheduleDate) => {
  const { data, isLoading } = useQuery<TSchedule[]>({
    queryKey: ["get-schedule", params],
    queryFn: () => scheduleApi.getSchedule(params),
  });
  return {
    data,
    isLoading,
  };
};
const useCreateSchedule = (close: () => void) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: scheduleApi.createSchedule,
    mutationKey: ["create-schedule"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-schedule"] });
      close();
    },
  });
  const submit = (body: TScheduleCreate) => {
    mutate(body);
  };
  return {
    submit,
    isPending,
  };
};
const useCreateTransferSchedule = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: string) => void;
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: scheduleApi.sendScheduleTransfer,
    mutationKey: ["create-transfer-schedule"],
    onSuccess: () => onSuccess(),
    onError: (error: AxiosError<{ message: string }>) =>
      onError(error.response?.data.message ?? ""),
  });
  const submit = (body: TScheduleMove) => {
    mutate(body);
  };
  return {
    submit,
    isPending,
  };
};
const useCreateCancelSchedule = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: (error: string) => void;
}) => {
  const { mutate, isPending } = useMutation({
    mutationFn: scheduleApi.sendScheduleCancel,
    mutationKey: ["create-cancel-schedule"],
    onSuccess: () => onSuccess(),
    onError: (error: AxiosError<{ message: string }>) =>
      onError(error.response?.data.message ?? ""),
  });
  const submit = (body: Pick<TScheduleMove, "reason">) => {
    mutate(body);
  };
  return {
    submit,
    isPending,
  };
};
const useGetScheduleByDirection = (params: TScheduleWithDirection) => {
  const { data, isLoading } = useQuery({
    queryKey: ["get-schedule-by-direction", params],
    queryFn: () => scheduleApi.getScheduleByDirection(params),
  });
  return {
    data,
    isLoading,
  };
};
const useAttachedStudentToSchedule = ({
  onSuccess,
}: {
  onSuccess: () => void;
}) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: scheduleApi.attachedStudentToSchedule,
    mutationKey: ["attached-student-to-schedule"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["get-schedule-by-direction"],
      });
      onSuccess();
    },
  });
  const submit = (scheduleId: string) =>
    mutate({
      scheduleId,
    });
  return {
    submit,
    isPending,
  };
};
export const querySchedule = {
  useGetWorkingDays,
  useGetSchedule,
  useCreateSchedule,
  useCreateTransferSchedule,
  useCreateCancelSchedule,
  useGetScheduleByDirection,
  useAttachedStudentToSchedule,
};
