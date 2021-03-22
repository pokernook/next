import { FC } from "react";

import { DashboardLayout } from "../components/DashboardLayout";
import { useUser } from "../hooks/use-user";

const Home: FC = () => {
  useUser({ redirectTo: "/logIn" });

  return (
    <DashboardLayout>
      <></>
    </DashboardLayout>
  );
};

export default Home;
