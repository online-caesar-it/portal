import { useCheckedRoleAdmin } from "~/shared/hooks/useCheckedRole";
import ScheduleTabs from "~/widgets/schedule/ui/schedule-tabs";

const AdminSchedulePage = () => {
  useCheckedRoleAdmin();
  return <ScheduleTabs />;
};

export default AdminSchedulePage;
