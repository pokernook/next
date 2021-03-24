import { FC } from "react";
import { Avatar, Box, Divider, Flex, Heading } from "theme-ui";

import { NavLink, NavLinkProps } from "../components/NavLink";
import { useAvatarSrc } from "../hooks/use-avatar-src";
import { useUser } from "../hooks/use-user";

const sideNavRoutes: NavLinkProps[] = [
  { href: "/", children: "Home" },
  { href: "/friends", children: "Friends" },
  { href: "/friends/pending", children: "Pending Friends" },
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
        {sideNavRoutes.map((routeProps, idx) => (
          <Box key={idx} sx={{ my: 1 }}>
            <NavLink {...routeProps} />
          </Box>
        ))}
      </Box>
    </>
  );
};
