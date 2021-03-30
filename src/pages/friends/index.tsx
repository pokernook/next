import { FC } from "react";
import { Box } from "theme-ui";

import { DashboardLayout } from "../../components/DashboardLayout";
import { Friend } from "../../components/Friends";
import { FriendsLayout } from "../../components/FriendsLayout";
import { useFriendshipsQuery } from "../../graphql/types";

const Friends: FC = () => {
  const [friendshipsQuery] = useFriendshipsQuery();

  const { data } = friendshipsQuery;

  return (
    <DashboardLayout>
      <FriendsLayout>
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
      </FriendsLayout>
    </DashboardLayout>
  );
};

export default Friends;
