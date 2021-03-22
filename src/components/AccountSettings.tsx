import { FC } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Divider, Field, Heading, Link, Text } from "theme-ui";

import {
  MutationUserUpdateEmailArgs,
  MutationUserUpdatePasswordArgs,
  useDeleteAccountMutation,
  useUpdateEmailMutation,
  useUpdatePasswordMutation,
} from "../graphql/types";
import { useUser } from "../hooks/use-user";
import { FadeIn } from "./Animated";

export const AccountSettings: FC = () => (
  <>
    <UpdateEmail />
    <Divider my={3} />
    <UpdatePassword />
    <Divider my={3} />
    <DeleteAccount />
  </>
);

const UpdateEmail = () => {
  const { user } = useUser();
  const {
    handleSubmit,
    register,
    formState,
    reset,
  } = useForm<MutationUserUpdateEmailArgs>({
    defaultValues: { newEmail: user?.email },
  });
  const [, updateEmail] = useUpdateEmailMutation();

  const { isDirty } = formState;

  const onSubmit = handleSubmit(async (data) => {
    const result = await updateEmail(data);
    if (!result.error) {
      reset({ newEmail: result.data?.userUpdateEmail?.email });
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <Heading as="h3" mb={3}>
        Email
      </Heading>

      <Field
        label="Email address"
        type="email"
        {...register("newEmail", { required: true })}
      />

      <Box mt={1} mb={3} ml={1}>
        {!user?.emailVerified && (
          <Text variant="help">
            Not verified; check your inbox, or{" "}
            <Link>resend the verification email</Link>.
          </Text>
        )}
      </Box>

      {isDirty && (
        <FadeIn>
          <Field
            label="Password"
            type="password"
            {...register("password", { required: true })}
            mb={3}
          />

          <Button variant="tertiary" type="submit">
            Save email
          </Button>
        </FadeIn>
      )}
    </form>
  );
};

const UpdatePassword = () => {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm<MutationUserUpdatePasswordArgs>();
  const [, updatePassword] = useUpdatePasswordMutation();

  const onSubmit = handleSubmit(async (data) => {
    const result = await updatePassword(data);
    if (!result.error) {
      reset();
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <Heading as="h3" mb={3}>
        Update password
      </Heading>

      <Field
        label="Current password"
        type="password"
        {...register("currentPassword", { required: true })}
        mb={3}
      />

      <Field
        label="New password"
        type="password"
        {...register("newPassword", { required: true })}
        mb={3}
      />

      <Button variant="tertiary" type="submit">
        Update password
      </Button>
    </form>
  );
};

const DeleteAccount = () => {
  const [, deleteAccount] = useDeleteAccountMutation();

  const handleDeleteAccount = () => deleteAccount();

  return (
    <>
      <Heading as="h3" mb={3}>
        Delete account
      </Heading>
      <Box mb={3}>
        <Text>Careful, there&apos;s no coming back.</Text>
      </Box>

      <Button variant="danger" onClick={handleDeleteAccount}>
        Delete account
      </Button>
    </>
  );
};
