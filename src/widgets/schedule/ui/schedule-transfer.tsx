import { querySchedule } from "~/entities/schedule/hooks/use-query-schedule";
import ScheduleRequestSend from "~/features/schedule/ui/schedule-request-send";
import { EScheduleTransferStatus } from "~/shared/enums/schedule-enum";

const ScheduleTransfer = () => {
  const { data, isLoading } = querySchedule.useGetScheduleTransfer({
    status: EScheduleTransferStatus.PENDING,
  });
  const { submit } = querySchedule.useUpdateTransferSchedule();

  return (
    <ScheduleRequestSend
      approve={(id) =>
        submit({
          scheduleTransferId: id,
          status: EScheduleTransferStatus.APPROVED,
        })
      }
      reject={(id) =>
        submit({
          scheduleTransferId: id,
          status: EScheduleTransferStatus.REJECTED,
        })
      }
      data={data ?? []}
      isLoading={isLoading}
      title={"Запросы на перенос занятия"}
    />
  );
};

export default ScheduleTransfer;
