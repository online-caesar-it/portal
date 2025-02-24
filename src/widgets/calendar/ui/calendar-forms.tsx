import ScheduleCancelForm from "~/features/schedule/ui/schedule-cancel-form";
import ScheduleTransferForm from "~/features/schedule/ui/schedule-transfer-form";

const CalendarForms = ({
  isTransferFormOpen,
  isCancelFormOpen,
  onCloseCancel,
  onCloseTransfer,
  scheduleId,
}: {
  isCancelFormOpen: boolean;
  isTransferFormOpen: boolean;
  onCloseTransfer: () => void;
  onCloseCancel: () => void;
  scheduleId: string;
}) => {
  return (
    <>
      {isTransferFormOpen && (
        <ScheduleTransferForm
          scheduleId={scheduleId}
          onClose={onCloseTransfer}
        />
      )}
      {isCancelFormOpen && (
        <ScheduleCancelForm scheduleId={scheduleId} onClose={onCloseCancel} />
      )}
    </>
  );
};

export default CalendarForms;
