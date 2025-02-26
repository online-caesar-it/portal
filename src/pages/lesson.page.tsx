import { useCheckedRoleAdmin } from "~/shared/hooks/useCheckedRole";

const LessonPage = () => {
  useCheckedRoleAdmin();
  return <div>LessonPage</div>;
};

export default LessonPage;
