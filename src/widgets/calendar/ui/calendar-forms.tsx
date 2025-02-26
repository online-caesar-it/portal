import AttachLessonSchedule from "~/features/lesson/ui/attach-lesson-schedule";
import ScheduleCancelForm from "~/features/schedule/ui/schedule-cancel-form";
import ScheduleTransferForm from "~/features/schedule/ui/schedule-transfer-form";

const CalendarForms = ({
  isTransferFormOpen,
  isCancelFormOpen,
  onCloseCancel,
  onCloseTransfer,
  scheduleId,
  isAttachedLessonOpen,
  onCloseAttachedLesson,
}: {
  isCancelFormOpen: boolean;
  isTransferFormOpen: boolean;
  onCloseTransfer: () => void;
  onCloseCancel: () => void;
  scheduleId: string;
  isAttachedLessonOpen: boolean;
  onCloseAttachedLesson: () => void;
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
      {isAttachedLessonOpen && (
        <AttachLessonSchedule
          onClose={onCloseAttachedLesson}
          scheduleId={scheduleId}
        />
      )}
    </>
  );
};

export default CalendarForms;
