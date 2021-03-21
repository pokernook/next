import { FC, useState } from "react";
import { Avatar, Button, Heading, Text } from "theme-ui";

import {
  useLogOutMutation,
  useMeQuery,
  useStatusClearMutation,
} from "../graphql/types";
import { MenuButton, MenuCard, MenuDivider, MenuItem } from "./Menu";
import { ModalPortal } from "./Modal";
import { ProfileModal } from "./ProfileModal";
import { StatusModal } from "./StatusModal";

export const UserNavMenu: FC = () => {
  const [meQuery] = useMeQuery();
  const [, clearStatus] = useStatusClearMutation();
  const [, logOut] = useLogOutMutation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const { data } = meQuery;

  const handleLogOut = () => logOut();

  const openStatusModal = () => {
    setMenuOpen(false);
    setStatusModalOpen(true);
  };

  const openProfileModal = () => {
    setMenuOpen(false);
    setProfileModalOpen(true);
  };

  const handleClearStatus = async () => {
    setMenuOpen(false);
    await clearStatus();
  };

  return (
    <>
      {data?.me?.status && (
        <Button
          variant="unstyled"
          onClick={openStatusModal}
          sx={{ fontSize: 2, p: 2 }}
        >
          {data?.me?.status?.emoji}
        </Button>
      )}

      <Button variant="unstyled" onClick={() => setMenuOpen(true)}>
        <Avatar src={undefined} sx={{ height: 32, width: 32 }} />
      </Button>

      {menuOpen && (
        <ModalPortal onClose={() => setMenuOpen(false)}>
          <MenuCard sx={{ position: "absolute", right: 24, top: 40 }}>
            <MenuItem>
              <Avatar src={undefined} sx={{ height: 40, width: 40, mr: 2 }} />
              <Heading as="h3">{data?.me?.username}</Heading>
              <Heading as="h3" sx={{ color: "textMuted", fontWeight: "body" }}>
                {data?.me?.discriminator}
              </Heading>
            </MenuItem>

            <MenuItem>
              <Button
                variant="tertiary"
                sx={{
                  width: "100%",
                  textAlign: "left",
                  bg: "background",
                  border: "solid",
                  borderColor: "border",
                  borderWidth: 1,
                }}
                onClick={openStatusModal}
              >
                {data?.me?.status ? (
                  <Text>
                    {data.me.status.emoji} {data.me.status.message}
                  </Text>
                ) : (
                  <Text color="textMuted">Update status</Text>
                )}
              </Button>
            </MenuItem>

            {data?.me?.status && (
              <MenuButton onClick={handleClearStatus}>Clear status</MenuButton>
            )}

            <MenuDivider />

            <MenuButton onClick={openProfileModal}>Edit profile</MenuButton>
            <MenuButton onClick={() => setMenuOpen(false)}>
              View profile
            </MenuButton>
            <MenuButton onClick={() => setMenuOpen(false)}>Settings</MenuButton>

            <MenuDivider />

            <MenuButton onClick={handleLogOut}>Log out of PokerNook</MenuButton>
          </MenuCard>
        </ModalPortal>
      )}

      {statusModalOpen && (
        <StatusModal onClose={() => setStatusModalOpen(false)} />
      )}

      {profileModalOpen && (
        <ProfileModal onClose={() => setProfileModalOpen(false)} />
      )}
    </>
  );
};
