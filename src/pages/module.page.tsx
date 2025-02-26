import { useCheckedRoleAdmin } from "~/shared/hooks/useCheckedRole";
import Module from "~/widgets/module/ui/module";

const ModulePage = () => {
  useCheckedRoleAdmin();
  return <Module />;
};

export default ModulePage;
