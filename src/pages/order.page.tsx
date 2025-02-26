import { useCheckedRoleAdmin } from "~/shared/hooks/useCheckedRole";

const OrderPage = () => {
  useCheckedRoleAdmin();
  return <div>OrderPage</div>;
};

export default OrderPage;
