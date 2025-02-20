import ScheduleCancelForm from "~/features/schedule/ui/schedule-cancel-form";
import ScheduleTransferForm from "~/features/schedule/ui/schedule-transfer-form";

const CalendarForms = ({
  isTransferFormOpen,
  isCancelFormOpen,
  onCloseCancel,
  onCloseTransfer,
}: {
  isCancelFormOpen: boolean;
  isTransferFormOpen: boolean;
  onCloseTransfer: () => void;
  onCloseCancel: () => void;
}) => {
  return (
    <>
      {isTransferFormOpen && <ScheduleTransferForm onClose={onCloseTransfer} />}
      {isCancelFormOpen && <ScheduleCancelForm onClose={onCloseCancel} />}
    </>
  );
};

export default CalendarForms;
