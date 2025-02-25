import { Badge } from "@mantine/core";
import { EScheduleTransferStatus } from "~/shared/enums/schedule-enum";

const statusColors = {
  [EScheduleTransferStatus.PENDING]: {
    color: "green",
    text: "Ожидание",
  },
  [EScheduleTransferStatus.APPROVED]: {
    color: "red",
    text: "Согласовано",
  },
  [EScheduleTransferStatus.REJECTED]: {
    color: "blue",
    text: "Отклонено",
  },
};
const ScheduleRequestStatus = ({
  status,
}: {
  status: EScheduleTransferStatus;
}) => {
  return (
    <Badge color={statusColors[status].color}>
      {statusColors[status].text}
    </Badge>
  );
};

export default ScheduleRequestStatus;
