import { FC } from "react";
import { Box, Container, Divider, Heading } from "theme-ui";

import { DashboardLayout } from "../../components/DashboardLayout";
import { Friend } from "../../components/Friends";
import { useFriendshipsQuery } from "../../graphql/types";

const Friends: FC = () => {
  const [friendshipsQuery] = useFriendshipsQuery();

  const { data } = friendshipsQuery;

  return (
    <DashboardLayout>
      <Container sx={{ maxWidth: 900, pt: 20 }}>
        <Heading as="h1" mb={3}>
          Friends
        </Heading>

        <Divider mb={3} />

        <Box>
          {data?.me?.friendships.map((friendship) =>
            friendship.users.map(
              (friend) =>
                data.me?.id !== friend.id && (
                  <Box key={friendship.id} my={2}>
                    <Friend friend={friend} />
                  </Box>
                )
            )
          )}
        </Box>
      </Container>
    </DashboardLayout>
  );
};

export default Friends;
