import { FC, ReactNode } from "react";
import { Box, Grid } from "theme-ui";

import { useUser } from "../hooks/use-user";
import { SideNav } from "./SideNav";
import { TopNav } from "./TopNav";

type DashboardLayoutProps = {
  children: ReactNode;
};

export const DashboardLayout: FC<DashboardLayoutProps> = ({
  children,
}: DashboardLayoutProps) => {
  useUser({ redirectTo: "/logIn" });

  return (
    <Grid
      columns={["auto"]}
      gap="0px"
      sx={{
        minHeight: "100vh",
        width: "100vw",
        gridTemplateRows: "50px auto",
        display: "relative",
      }}
    >
      <TopNav />
      <Grid columns={[2, "280px 1fr"]} gap="0px">
        <Box
          as="aside"
          sx={{
            borderRight: "solid",
            borderRightColor: "border",
            borderRightWidth: 1,
          }}
        >
          <SideNav />
        </Box>

        <Box
          as="main"
          sx={{
            display: "inherit",
            minHeight: "inherit",
            width: "100%",
            overflow: "auto",
          }}
        >
          {children}
        </Box>
      </Grid>
    </Grid>
  );
};
