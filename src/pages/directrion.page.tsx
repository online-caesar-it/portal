import { useCheckedRoleAdmin } from "~/shared/hooks/useCheckedRole";
import Direction from "~/widgets/direction/ui/direction";
const DirectionPage = () => {
  useCheckedRoleAdmin();
  return <Direction />;
};

export default DirectionPage;
