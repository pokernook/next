import { FC } from "react";
import { Avatar, Box, Divider, Flex, Heading } from "theme-ui";

import { NavLink, NavLinkProps } from "../components/NavLink";
import { useMeQuery } from "../graphql/types";

const sideNavRoutes: NavLinkProps[] = [
  { href: "/", children: "Home" },
  { href: "/friends", children: "Friends" },
];

export const SideNav: FC = () => {
  const [meQuery] = useMeQuery();

  const { data } = meQuery;

  return (
    <>
      <Flex sx={{ alignItems: "center", mx: 3 }}>
        <Avatar src={undefined} sx={{ height: 48, width: 48, mr: 2 }} />
        <Heading as="h3">{data?.me?.username}</Heading>
        <Heading as="h3" sx={{ color: "textMuted", fontWeight: "body" }}>
          {data?.me?.discriminator}
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
