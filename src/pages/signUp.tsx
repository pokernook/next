import Head from "next/head";
import Link from "next/link";
import { withUrqlClient } from "next-urql";
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
import { SignUpMutationVariables, useSignUpMutation } from "../graphql/types";
import { getClientConfig } from "../urql";

const SignUp: FC = () => {
  // TODO: Fix ESLint error
  // eslint-disable-next-line
  const { register, handleSubmit } = useForm<SignUpMutationVariables>();
  const [signUpResult, signUp] = useSignUpMutation();

  const onSubmit = handleSubmit((data) => signUp(data));

  return (
    <AuthLayout>
      <Head>
        <title>PokerNook - Sign Up</title>
      </Head>

      <Heading mb={3}>Create your account</Heading>

      {signUpResult.error && (
        <FadeIn>
          <Alert variant="error" mb={3}>
            {signUpResult.error.networkError?.message ||
              signUpResult.error.graphQLErrors[0]?.message}
          </Alert>
        </FadeIn>
      )}

      <Card>
        <Box as="form" onSubmit={onSubmit}>
          <Field
            label="Username"
            type="text"
            spellCheck={false}
            {...register("username", { required: true })}
            mb={2}
          />

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
            disabled={signUpResult.fetching}
            variant="primary"
            sx={{ minWidth: "70%" }}
          >
            {signUpResult.fetching
              ? "We're working on it..."
              : "Sign up for PokerNook"}
          </Button>
        </Box>
      </Card>

      <Card mt={3}>
        <Text>
          Been here before?{" "}
          <Link href="/logIn" passHref>
            <ThemeLink>Log in</ThemeLink>
          </Link>
          .
        </Text>
      </Card>
    </AuthLayout>
  );
};

export default withUrqlClient(getClientConfig)(SignUp);
