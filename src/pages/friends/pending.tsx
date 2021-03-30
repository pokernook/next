import { FC } from "react";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import { Box, Button, Grid, Input, Label } from "theme-ui";

import { DashboardLayout } from "../../components/DashboardLayout";
import {
  FriendRequestReceived,
  FriendRequestSent,
} from "../../components/Friends";
import { FriendsLayout } from "../../components/FriendsLayout";
import {
  useFriendRequestAcceptMutation,
  useFriendRequestCancelMutation,
  useFriendRequestRejectMutation,
  useFriendRequestSendMutation,
  useFriendRequestsReceivedQuery,
  useFriendRequestsSentQuery,
} from "../../graphql/types";
import { parseUserTag } from "../../utils/parse-user-tag";

type FormData = {
  tag: string;
};

const PendingFriends: FC = () => {
  const { register, reset, handleSubmit } = useForm<FormData>();
  const [, sendFriendRequest] = useFriendRequestSendMutation();
  const { addToast } = useToasts();

  const onSubmit = handleSubmit(async ({ tag }) => {
    const userTag = parseUserTag(tag);
    const result = await sendFriendRequest(userTag);
    result.error
      ? addToast(result.error.graphQLErrors[0]?.message, {
          appearance: "error",
        })
      : reset();
  });

  return (
    <DashboardLayout>
      <FriendsLayout>
        <Box as="form" onSubmit={onSubmit} mb={3}>
          <Label>Add a friend with their PokerNook Tag</Label>
          <Grid columns={["4fr 1fr"]} sx={{ alignItems: "center" }}>
            <Input
              {...register("tag", { required: true, pattern: /^.+#\d{1,4}$/ })}
              placeholder="Enter a Username#0000"
            />

            <Button type="submit" variant="secondary">
              Add friend
            </Button>
          </Grid>
        </Box>

        <ReceivedList />
        <SentList />
      </FriendsLayout>
    </DashboardLayout>
  );
};

const ReceivedList = () => {
  const [friendRequestsReceivedQuery] = useFriendRequestsReceivedQuery();
  const [, rejectFriendRequest] = useFriendRequestRejectMutation();
  const [, acceptFriendRequest] = useFriendRequestAcceptMutation();

  const { data: friendRequestsReceived } = friendRequestsReceivedQuery;

  return (
    <>
      {friendRequestsReceived?.me?.friendRequestsReceived.map(
        (friendRequest) => (
          <Box key={friendRequest.id} my={2}>
            <FriendRequestReceived
              onAccept={() =>
                acceptFriendRequest({ friendRequestId: friendRequest.id })
              }
              onReject={() =>
                rejectFriendRequest({ friendRequestId: friendRequest.id })
              }
              friendRequest={friendRequest}
            />
          </Box>
        )
      )}
    </>
  );
};

const SentList = () => {
  const [friendRequestsSentQuery] = useFriendRequestsSentQuery();
  const [, cancelFriendRequest] = useFriendRequestCancelMutation();

  const { data: friendRequestsSent } = friendRequestsSentQuery;

  return (
    <>
      {friendRequestsSent?.me?.friendRequestsSent.map((friendRequest) => (
        <Box key={friendRequest.id} my={2}>
          <FriendRequestSent
            onCancel={() =>
              cancelFriendRequest({ friendRequestId: friendRequest.id })
            }
            friendRequest={friendRequest}
          />
        </Box>
      ))}
    </>
  );
};

export default PendingFriends;
