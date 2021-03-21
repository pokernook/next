import { withUrqlClient } from "next-urql";
import { FC } from "react";

import { DashboardLayout } from "../components/DashboardLayout";
import { getClientConfig } from "../urql";

const Home: FC = () => {
  return (
    <DashboardLayout>
      <></>
    </DashboardLayout>
  );
};

export default withUrqlClient(getClientConfig)(Home);
