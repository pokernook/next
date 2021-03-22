import { FC } from "react";

import { DashboardLayout } from "../components/DashboardLayout";
import { useUser } from "../hooks/use-user";

const Friends: FC = () => {
  useUser({ redirectTo: "/logIn" });

  return (
    <DashboardLayout>
      <></>
    </DashboardLayout>
  );
};

export default Friends;
