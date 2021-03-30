import { FC, ReactNode } from "react";
import { Container, Divider, Heading } from "theme-ui";

type FriendsLayoutProps = {
  children: ReactNode;
};

export const FriendsLayout: FC<FriendsLayoutProps> = ({
  children,
}: FriendsLayoutProps) => (
  <Container sx={{ maxWidth: 900, pt: 20 }}>
    <Heading as="h1">Friends</Heading>
    <Divider my={3} />
    {children}
  </Container>
);
