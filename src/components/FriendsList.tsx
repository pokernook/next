import { FC } from "react";
import { Avatar, Box, Divider, Flex, Heading } from "theme-ui";

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
              <FriendsListItem key={friendship.id} user={friend} />
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
      <Divider />
      <Flex sx={{ p: 3, borderRadius: 4, ":hover": { bg: "muted" } }}>
        <Avatar
          src={useAvatarSrc(user)}
          sx={{ width: 48, height: 48, mr: 3 }}
        />
        <Box>
          <Flex mb={2}>
            <Heading as="h3">{user.username}</Heading>
            <Heading as="h3" sx={{ color: "textMuted", fontWeight: "body" }}>
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
