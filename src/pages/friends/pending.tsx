import { FC } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Container, Divider, Field, Heading } from "theme-ui";

import { DashboardLayout } from "../../components/DashboardLayout";
import {
  FriendRequestReceived,
  FriendRequestSent,
} from "../../components/Friends";
import {
  FriendRequestSendMutationVariables,
  useFriendRequestCancelMutation,
  useFriendRequestRejectMutation,
  useFriendRequestSendMutation,
  useFriendRequestsReceivedQuery,
  useFriendRequestsSentQuery,
} from "../../graphql/types";

const PendingFriends: FC = () => {
  const {
    register,
    reset,
    handleSubmit,
  } = useForm<FriendRequestSendMutationVariables>();
  const [, sendFriendRequest] = useFriendRequestSendMutation();

  const onSubmit = handleSubmit(async (data) => {
    const result = await sendFriendRequest(data);
    if (!result.error) {
      reset();
    }
  });

  return (
    <DashboardLayout>
      <Container sx={{ maxWidth: 900, pt: 20 }}>
        <Heading as="h1" mb={3}>
          Pending Friends
        </Heading>

        <Divider mb={3} />

        <Box>
          {/* TODO: tag should be enterable in one field */}
          <Box as="form" onSubmit={onSubmit} mb={3}>
            <Field
              {...register("username", { required: true })}
              label="Username"
              mb={2}
            />
            <Field
              {...register("discriminator", {
                required: true,
                valueAsNumber: true,
              })}
              label="Discriminator"
              mb={2}
            />
            <Button type="submit" variant="secondary">
              Add friend
            </Button>
          </Box>

          <ReceivedList />
          <SentList />
        </Box>
      </Container>
    </DashboardLayout>
  );
};

const ReceivedList = () => {
  const [friendRequestsReceivedQuery] = useFriendRequestsReceivedQuery();
  const [, rejectFriendRequest] = useFriendRequestRejectMutation();

  const { data: friendRequestsReceived } = friendRequestsReceivedQuery;

  return (
    <>
      {friendRequestsReceived?.me?.friendRequestsReceived.map(
        (friendRequest) => (
          <Box key={friendRequest.id} my={2}>
            <FriendRequestReceived
              onAccept={() => undefined}
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
