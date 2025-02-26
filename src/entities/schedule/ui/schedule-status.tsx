import { Badge } from "@mantine/core";
import { EScheduleStatus } from "~/shared/enums/schedule-enum";

const statusColors = {
  [EScheduleStatus.SCHEDULED]: {
    color: "green",
    text: "По расписанию",
  },
  [EScheduleStatus.CANCELED]: {
    color: "red",
    text: "Отменено",
  },
  [EScheduleStatus.MOVED]: {
    color: "blue",
    text: "Перенесено",
  },
  [EScheduleStatus.END]: {
    color: "green",
    text: "Занятие прошло",
  },
};

const ScheduleStatus = ({ status }: { status: EScheduleStatus }) => {
  return (
    <Badge color={statusColors[status].color}>
      {statusColors[status].text}
    </Badge>
  );
};

export default ScheduleStatus;
