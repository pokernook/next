import Head from "next/head";
import Link from "next/link";
import { FC } from "react";
import { useForm } from "react-hook-form";
import {
  Alert,
  Box,
  Button,
  Card,
  Field,
  Heading,
  Link as ThemeLink,
  Text,
} from "theme-ui";

import { FadeIn } from "../components/Animated";
import { AuthLayout } from "../components/AuthLayout";
import { LogInMutationVariables, useLogInMutation } from "../graphql/types";

const LogIn: FC = () => {
  // TODO: Fix ESLint error
  // eslint-disable-next-line
  const { register, handleSubmit } = useForm<LogInMutationVariables>();
  const [logInResult, logIn] = useLogInMutation();

  const onSubmit = handleSubmit((data) => logIn(data));

  return (
    <AuthLayout>
      <Head>
        <title>PokerNook - Log In</title>
      </Head>

      <Heading mb={3}>Enter the &apos;Nook</Heading>

      {logInResult.error && (
        <FadeIn>
          <Alert variant="error" mb={3}>
            {logInResult.error.networkError?.message ||
              logInResult.error.graphQLErrors[0]?.message}
          </Alert>
        </FadeIn>
      )}

      <Card>
        <Box as="form" onSubmit={onSubmit}>
          <Field
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
