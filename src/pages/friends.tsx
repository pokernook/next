import { FC } from "react";
import { Box, Container, Heading } from "theme-ui";

import { DashboardLayout } from "../components/DashboardLayout";
import { FriendsList } from "../components/FriendsList";

const Friends: FC = () => (
  <DashboardLayout>
    <Container sx={{ maxWidth: 900, pt: 20 }}>
      <Heading as="h1" mb={4}>
        Friends
      </Heading>

      <Box>
        <FriendsList />
      </Box>
    </Container>
  </DashboardLayout>
);

export default Friends;
