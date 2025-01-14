import Mantine from "./mantine";
import RoutesProvider from "./routes";
import RtkQuery from "./rtk-query";

const Providers = () => {
  return (
    <RtkQuery>
      <Mantine>
        <RoutesProvider />
      </Mantine>
    </RtkQuery>
  );
};

export default Providers;
