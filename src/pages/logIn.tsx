import Link from "next/link";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { useToasts } from "react-toast-notifications";
import {
  Box,
  Button,
  Card,
  Field,
  Heading,
  Link as ThemeLink,
  Text,
} from "theme-ui";

import { AuthLayout } from "../components/AuthLayout";
import { LogInMutationVariables, useLogInMutation } from "../graphql/types";

const LogIn: FC = () => {
  const { register, handleSubmit } = useForm<LogInMutationVariables>();
  const [logInResult, logIn] = useLogInMutation();
  const { addToast } = useToasts();

  const onSubmit = handleSubmit(async (data) => {
    const result = await logIn(data);
    if (result.error) {
      addToast(result.error.graphQLErrors[0]?.message, { appearance: "error" });
    }
  });

  return (
    <AuthLayout>
      <Heading as="h2" mb={3}>
        Enter the &apos;Nook
      </Heading>

      <Card>
        <Box as="form" onSubmit={onSubmit}>
          <Field
            autoFocus
            label="Email"
            type="email"
            {...register("email", { required: true })}
            mb={2}
          />

          <Field
            label="Password"
            type="password"
            {...register("password", { required: true })}
            mb={3}
          />

          <Button
            type="submit"
            disabled={logInResult.fetching}
            variant="primary"
            sx={{ minWidth: "70%" }}
          >
            {logInResult.fetching ? "Hang in there..." : "Log in to PokerNook"}
          </Button>
        </Box>
      </Card>

      <Card mt={3}>
        <Text>
          New &apos;round these parts?{" "}
          <Link href="/signUp" passHref>
            <ThemeLink>Sign up</ThemeLink>
          </Link>
          .
        </Text>
      </Card>
    </AuthLayout>
  );
};

export default LogIn;
