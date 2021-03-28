import { formatDistanceToNow } from "date-fns";
import { FC, ReactNode } from "react";
import { FiCheck, FiMoreVertical, FiX } from "react-icons/fi";
import { Avatar, Box, Flex, Heading, IconButton, Text } from "theme-ui";

import {
  FriendRequestFieldsFragment,
  UserFieldsFragment,
} from "../graphql/types";
import { useAvatarSrc } from "../hooks/use-avatar-src";

type FlexContainerProps = {
  children: ReactNode;
};

const FlexContainer: FC<FlexContainerProps> = ({
  children,
}: FlexContainerProps) => (
  <Flex
    sx={{
      p: 3,
      bg: "background",
      border: "solid",
      borderColor: "border",
      borderWidth: 2,
      borderRadius: 4,
      ":hover": {
        bg: "muted",
      },
    }}
  >
    {children}
  </Flex>
);

type FriendProps = {
  friend: UserFieldsFragment;
};

export const Friend: FC<FriendProps> = ({ friend }: FriendProps) => (
  <>
    <FlexContainer>
      <Avatar
        src={useAvatarSrc(friend)}
        sx={{ width: 48, height: 48, mr: 3 }}
      />
      <Box>
        <Flex mb={2}>
          <Heading as="h3">{friend.username}</Heading>
          <Heading as="h3" sx={{ color: "textMuted" }}>
            {friend.discriminator}
          </Heading>
        </Flex>

        {friend.status &&
          `${friend.status.emoji || ""} ${friend.status.message || ""}`}
      </Box>

      <Flex sx={{ alignItems: "center", justifyContent: "flex-end", flex: 1 }}>
        <IconButton variant="close">
          <FiMoreVertical size={24} />
        </IconButton>
      </Flex>
    </FlexContainer>
  </>
);

type SentProps = {
  friendRequest: FriendRequestFieldsFragment;
  onCancel: () => void;
};

export const FriendRequestSent: FC<SentProps> = ({
  friendRequest,
  onCancel,
}: SentProps) => {
  const sentAt = formatDistanceToNow(new Date(friendRequest.updatedAt), {
    addSuffix: true,
  });

  return (
    <>
      <FlexContainer>
        <Avatar
          src={useAvatarSrc(friendRequest.to)}
          sx={{ width: 48, height: 48, mr: 3 }}
        />

        <Box>
          <Flex mb={2}>
            <Heading as="h3">{friendRequest.to?.username}</Heading>
            <Heading as="h3" sx={{ color: "textMuted" }}>
              {friendRequest.to?.discriminator}
            </Heading>
          </Flex>

          {friendRequest.to?.status &&
            `${friendRequest.to.status.emoji || ""} ${
              friendRequest.to.status.message || ""
            }`}
        </Box>

        <Flex
          sx={{ alignItems: "center", justifyContent: "flex-end", flex: 1 }}
        >
          <Text mr={3}>Sent {sentAt}</Text>
          <IconButton variant="close" onClick={onCancel}>
            <FiX size={24} />
          </IconButton>
        </Flex>
      </FlexContainer>
    </>
  );
};

type ReceivedProps = {
  friendRequest: FriendRequestFieldsFragment;
  onAccept: () => void;
  onReject: () => void;
};

export const FriendRequestReceived: FC<ReceivedProps> = ({
  friendRequest,
  onAccept,
  onReject,
}: ReceivedProps) => {
  const receivedAt = formatDistanceToNow(new Date(friendRequest.updatedAt), {
    addSuffix: true,
  });

  return (
    <>
      <FlexContainer>
        <Avatar
          src={useAvatarSrc(friendRequest.from)}
          sx={{ width: 48, height: 48, mr: 3 }}
        />

        <Box>
          <Flex mb={2}>
            <Heading as="h3">{friendRequest.from?.username}</Heading>
            <Heading as="h3" sx={{ color: "textMuted" }}>
              {friendRequest.from?.discriminator}
            </Heading>
          </Flex>

          {friendRequest.from?.status &&
            `${friendRequest.from.status.emoji || ""} ${
              friendRequest.from.status.message || ""
            }`}
        </Box>

        <Flex
          sx={{ alignItems: "center", justifyContent: "flex-end", flex: 1 }}
        >
          <Text mr={3}>Received {receivedAt}</Text>
          <IconButton mr={2} variant="close" onClick={onAccept}>
            <FiCheck size={24} />
          </IconButton>
          <IconButton variant="close" onClick={onReject}>
            <FiX size={24} />
          </IconButton>
        </Flex>
      </FlexContainer>
    </>
  );
};
