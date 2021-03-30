import { FC } from "react";
import { FiPlayCircle, FiUserPlus, FiUsers } from "react-icons/fi";
import { Avatar, Box, Divider, Flex, Heading } from "theme-ui";

import { NavLink } from "../components/NavLink";
import { useAvatarSrc } from "../hooks/use-avatar-src";
import { useUser } from "../hooks/use-user";

type SideNavRouteProps = {
  href: string;
  icon: JSX.Element;
  text: string;
};

const sideNavRoutes: SideNavRouteProps[] = [
  { href: "/", icon: <FiPlayCircle size={18} />, text: "Play" },
  { href: "/friends", icon: <FiUsers size={18} />, text: "Friends" },
  {
    href: "/friends/pending",
    icon: <FiUserPlus size={18} />,
    text: "Pending Friends",
  },
];

export const SideNav: FC = () => {
  const { user } = useUser();
  const avatarSrc = useAvatarSrc(user);

  return (
    <>
      <Flex sx={{ alignItems: "center", mx: 3 }}>
        <Avatar src={avatarSrc} sx={{ height: 48, width: 48, mr: 2 }} />
        <Heading as="h3">{user?.username}</Heading>
        <Heading as="h3" sx={{ color: "textMuted" }}>
          {user?.discriminator}
        </Heading>
      </Flex>

      <Divider my={3} />

      <Box as="nav" mx={3}>
        {sideNavRoutes.map(({ href, text, icon }, idx) => (
          <NavLink href={href} key={idx} sx={{ my: 1 }}>
            <Flex mr={3}>{icon}</Flex>
            {text}
          </NavLink>
        ))}
      </Box>
    </>
  );
};
