import { ReactNode } from "react";
import {
  SCHEDULE_EDUCATOR,
  SCHEDULE_REQUEST_CANCELED,
  SCHEDULE_REQUEST_TRANSFER,
} from "~/shared/consants/schedule/schedule-tab";
import ScheduleEducators from "../ui/schedule-educators";
import ScheduleTransfer from "../ui/schedule-transfer";
import ScheduleCancel from "../ui/schedule-cancel";

type TScheduleTabsData = {
  Component: () => ReactNode;
  title: string;
  value: string;
};

export const scheduleTabsData: TScheduleTabsData[] = [
  {
    title: "Расписание преподавателей",
    Component: () => <ScheduleEducators />,
    value: SCHEDULE_EDUCATOR,
  },
  {
    title: "Запросы на переносы занятия",
    Component: () => <ScheduleTransfer />,
    value: SCHEDULE_REQUEST_TRANSFER,
  },
  {
    title: "Запросы на отмены занятия",
    Component: () => <ScheduleCancel />,
    value: SCHEDULE_REQUEST_CANCELED,
  },
];
