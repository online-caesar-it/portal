import { querySchedule } from "~/entities/schedule/hooks/use-query-schedule";
import ScheduleRequestSend from "~/features/schedule/ui/schedule-request-send";
import { EScheduleTransferStatus } from "~/shared/enums/schedule-enum";

const ScheduleCancel = () => {
  const { data, isLoading } = querySchedule.useGetScheduleCancel({
    status: EScheduleTransferStatus.PENDING,
  });
  const { submit } = querySchedule.useUpdateCancelSchedule();

  return (
    <ScheduleRequestSend
      data={data ?? []}
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
      isLoading={isLoading}
      title={"Запросы на отмену"}
    />
  );
};

export default ScheduleCancel;
