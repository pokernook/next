import { FC, ReactNode } from "react";
import { Box, Container, Divider, Flex, Heading } from "theme-ui";

import { NavLink, NavLinkProps } from "./NavLink";

type FriendsLayoutProps = {
  children: ReactNode;
};

const friendsRoutes: NavLinkProps[] = [
  { children: "All friends", href: "/friends" },
  { children: "Pending requests", href: "/friends/pending" },
];

export const FriendsLayout: FC<FriendsLayoutProps> = ({
  children,
}: FriendsLayoutProps) => (
  <Container sx={{ maxWidth: 900, pt: 20 }}>
    <Heading as="h2" mb={2}>
      Friends
    </Heading>

    <Flex>
      {friendsRoutes.map((props, idx) => (
        <Box key={idx} sx={{ mr: 2 }}>
          <NavLink {...props} />
        </Box>
      ))}
    </Flex>

    <Divider my={3} />

    {children}
  </Container>
);
