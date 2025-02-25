import { Tabs } from "@mantine/core";
import {
  SCHEDULE_EDUCATOR,
  SCHEDULE_REQUEST_CANCELED,
  SCHEDULE_REQUEST_TRANSFER,
} from "~/shared/consants/schedule/schedule-tab";
import ScheduleEducators from "./schedule-educators";
import ScheduleTransfer from "./schedule-transfer";
import ScheduleCancel from "./schedule-cancel";

const ScheduleTabs = () => {
  return (
    <Tabs defaultValue={SCHEDULE_EDUCATOR}>
      <Tabs.List>
        <Tabs.Tab value={SCHEDULE_EDUCATOR}>Расписание</Tabs.Tab>
        <Tabs.Tab value={SCHEDULE_REQUEST_TRANSFER}>Перенос занятия</Tabs.Tab>
        <Tabs.Tab value={SCHEDULE_REQUEST_CANCELED}>Перенос занятия</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value={SCHEDULE_EDUCATOR}>
        <ScheduleEducators />
      </Tabs.Panel>
      <Tabs.Panel value={SCHEDULE_REQUEST_TRANSFER}>
        <ScheduleTransfer />
      </Tabs.Panel>
      <Tabs.Panel value={SCHEDULE_REQUEST_CANCELED}>
        <ScheduleCancel />
      </Tabs.Panel>
    </Tabs>
  );
};

export default ScheduleTabs;
