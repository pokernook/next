import { FC, useState } from "react";
import { Avatar, Button, Heading, Text } from "theme-ui";

import { useLogOutMutation, useStatusClearMutation } from "../graphql/types";
import { useAvatarSrc } from "../hooks/use-avatar-src";
import { useUser } from "../hooks/use-user";
import { MenuButton, MenuCard, MenuDivider, MenuItem } from "./Menu";
import { ModalPortal } from "./Modal";
import { ProfileModal } from "./ProfileModal";
import { SettingsModal } from "./SettingsModal";
import { StatusModal } from "./StatusModal";

export const UserNavMenu: FC = () => {
  const { user } = useUser();
  const [, clearStatus] = useStatusClearMutation();
  const [, logOut] = useLogOutMutation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const avatarSrc = useAvatarSrc(user);

  const handleLogOut = () => logOut();

  const openSettingsModal = () => {
    setMenuOpen(false);
    setSettingsModalOpen(true);
  };

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
      {user?.status && (
        <Button
          variant="unstyled"
          onClick={openStatusModal}
          sx={{ fontSize: 2, p: 2 }}
        >
          {user?.status.emoji}
        </Button>
      )}

      <Button variant="unstyled" onClick={() => setMenuOpen(true)}>
        <Avatar src={avatarSrc} sx={{ height: 32, width: 32 }} />
      </Button>

      {menuOpen && (
        <ModalPortal onClose={() => setMenuOpen(false)}>
          <MenuCard sx={{ position: "absolute", right: 24, top: 40 }}>
            <MenuItem>
              <Avatar src={avatarSrc} sx={{ height: 40, width: 40, mr: 2 }} />
              <Heading as="h3">{user?.username}</Heading>
              <Heading as="h3" sx={{ color: "textMuted" }}>
                {user?.discriminator}
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
                {user?.status ? (
                  <Text>
                    {user.status.emoji} {user.status.message}
                  </Text>
                ) : (
                  <Text color="textMuted">Update status</Text>
                )}
              </Button>
            </MenuItem>

            {user?.status && (
              <MenuButton onClick={handleClearStatus}>Clear status</MenuButton>
            )}

            <MenuDivider />

            <MenuButton onClick={openProfileModal}>Edit profile</MenuButton>
            <MenuButton onClick={() => setMenuOpen(false)}>
              View profile
            </MenuButton>
            <MenuButton onClick={openSettingsModal}>Settings</MenuButton>

            <MenuDivider />

            <MenuButton onClick={handleLogOut}>Log out of PokerNook</MenuButton>
          </MenuCard>
        </ModalPortal>
      )}

      {settingsModalOpen && (
        <SettingsModal onClose={() => setSettingsModalOpen(false)} />
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
