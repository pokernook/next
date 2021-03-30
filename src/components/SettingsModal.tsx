/** @jsxImportSource theme-ui */
import { FC } from "react";
import {
  MemoryRouter,
  NavLink,
  NavLinkProps,
  Redirect,
  Route,
} from "react-router-dom";
import { Box, Divider, Grid } from "theme-ui";

import { AccountSettings } from "./AccountSettings";
import {
  ModalCard,
  ModalClose,
  ModalContent,
  ModalHeader,
  ModalPortal,
} from "./Modal";
import { ThemeSettings } from "./ThemeSettings";

type Props = {
  onClose: () => void;
};

export const SettingsModal: FC<Props> = ({ onClose }: Props) => {
  return (
    <ModalPortal onClose={onClose} hasDimmedBackground>
      <ModalCard>
        <ModalClose onClose={onClose} />
        <ModalHeader>Settings</ModalHeader>

        <Divider />

        <MemoryRouter>
          <ModalContent>
            <Grid
              gap={3}
              columns={[2, "2fr 5fr"]}
              sx={{ height: 450, width: 650, ml: 3 }}
            >
              <Box sx={{ my: 2 }}>
                <SettingsNav />
              </Box>

              <Box sx={{ overflow: "auto", py: 3, pr: 4 }}>
                <SettingsRoutes />
              </Box>
            </Grid>
          </ModalContent>
        </MemoryRouter>
      </ModalCard>
    </ModalPortal>
  );
};

const settingsNavRoutes: NavLinkProps[] = [
  { to: "/settings/account", exact: true, children: "Account" },
  { to: "/settings/theme", exact: true, children: "Theme" },
];

const SettingsNav = () => (
  <>
    {settingsNavRoutes.map((props, idx) => (
      <Box key={idx} my={1}>
        <NavLink {...props} sx={{ variant: "links.nav" }} />
      </Box>
    ))}
  </>
);

const SettingsRoutes = () => (
  <>
    <Route exact path="/settings/account">
      <AccountSettings />
    </Route>

    <Route exact path="/settings/theme">
      <ThemeSettings />
    </Route>

    <Route>
      <Redirect to="/settings/account" />
    </Route>
  </>
);
