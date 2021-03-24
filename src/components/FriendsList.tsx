import { FC } from "react";
import { Avatar, Box, Flex, Heading } from "theme-ui";

import { useFriendshipsQuery, UserFieldsFragment } from "../graphql/types";
import { useAvatarSrc } from "../hooks/use-avatar-src";

export const FriendsList: FC = () => {
  const [friendshipsQuery] = useFriendshipsQuery();

  const { data } = friendshipsQuery;

  return (
    <>
      {data?.me?.friendships.map((friendship) =>
        friendship.users.map(
          (friend) =>
            data.me?.id !== friend.id && (
              <Box key={friendship.id} my={2}>
                <FriendsListItem user={friend} />
              </Box>
            )
        )
      )}
    </>
  );
};

type FriendsListItemProps = {
  user: UserFieldsFragment;
};

const FriendsListItem: FC<FriendsListItemProps> = ({
  user,
}: FriendsListItemProps) => {
  return (
    <>
      <Flex
        sx={{
          p: 3,
          bg: "muted",
          border: "solid",
          borderColor: "border",
          borderWidth: 1,
          borderRadius: 4,
        }}
      >
        <Avatar
          src={useAvatarSrc(user)}
          sx={{ width: 48, height: 48, mr: 3 }}
        />
        <Box>
          <Flex mb={2}>
            <Heading as="h3">{user.username}</Heading>
            <Heading as="h3" sx={{ color: "textMuted" }}>
              {user.discriminator}
            </Heading>
          </Flex>

          {user.status &&
            `${user.status.emoji || ""} ${user.status.message || ""}`}
        </Box>
      </Flex>
    </>
  );
};
