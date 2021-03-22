import Head from "next/head";
import { FC, ReactNode } from "react";
import { Box, Grid } from "theme-ui";

import { useUser } from "../hooks/use-user";
import { Loading } from "./Loading";
import { SideNav } from "./SideNav";
import { TopNav } from "./TopNav";

type DashboardLayoutProps = {
  children: ReactNode;
};

export const DashboardLayout: FC<DashboardLayoutProps> = ({
  children,
}: DashboardLayoutProps) => {
  const { fetching, user } = useUser({ redirectTo: "/logIn" });

  if (fetching || !user) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>PokerNook</title>
      </Head>

      <Grid
        columns={["auto"]}
        gap="0px"
        sx={{
          height: "100vh",
          width: "100vw",
          gridTemplateRows: "50px auto min-content",
        }}
      >
        <TopNav />
        <Grid
          columns={[2, "280px 1fr"]}
          gap="0px"
          sx={{
            gridTemplateRows: "auto",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            as="aside"
            sx={{
              borderRight: "solid",
              borderRightColor: "border",
              borderRightWidth: 1,
              py: 3,
            }}
          >
            <SideNav />
          </Box>

          <Box
            as="main"
            sx={{
              minWidth: 0,
              minHeight: 0,
              overflow: "auto",
            }}
          >
            {children}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
