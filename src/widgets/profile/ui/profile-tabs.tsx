import { Tabs } from "@mantine/core";
import {
  MAIN_TAB,
  SCHEDULE_EDUCATOR_TAB,
  SCHEDULE_STUDENT_TAB,
} from "~/shared/consants/profile/profile-tab";
import { RoleEnum } from "~/shared/enums/role-enum";
import { useSession } from "~/shared/hooks/useSession";
import ProfileData from "./profile-data";
import ProfileScheduleEducator from "./profile-schedule-educator";
import If from "~/shared/lib/components/if";

const ProfileTabs = () => {
  const { session } = useSession();
  return (
    <Tabs defaultValue={MAIN_TAB}>
      <Tabs.List>
        <Tabs.Tab value={MAIN_TAB}>Профиль</Tabs.Tab>
        <Tabs.Tab
          value={
            session?.data.role === RoleEnum.student
              ? SCHEDULE_STUDENT_TAB
              : SCHEDULE_EDUCATOR_TAB
          }
        >
          Расписание
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel
        className={"flex items-start justify-items-start"}
        value={MAIN_TAB}
      >
        <ProfileData />
      </Tabs.Panel>
      <Tabs.Panel
        value={
          session?.data.role === RoleEnum.student
            ? SCHEDULE_STUDENT_TAB
            : SCHEDULE_EDUCATOR_TAB
        }
      >
        <If
          when={session?.data.role === RoleEnum.EDUCATOR}
          elseComponent={<></>}
        >
          <ProfileScheduleEducator />
        </If>
      </Tabs.Panel>
    </Tabs>
  );
};

export default ProfileTabs;
