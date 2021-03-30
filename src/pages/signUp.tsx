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
import { SignUpMutationVariables, useSignUpMutation } from "../graphql/types";

const SignUp: FC = () => {
  const { register, handleSubmit } = useForm<SignUpMutationVariables>();
  const [signUpResult, signUp] = useSignUpMutation();
  const { addToast } = useToasts();

  const onSubmit = handleSubmit(async (data) => {
    const result = await signUp(data);
    if (result.error) {
      addToast(result.error.graphQLErrors[0]?.message, { appearance: "error" });
    }
  });

  return (
    <AuthLayout>
      <Heading as="h2" mb={3}>
        Create your account
      </Heading>

      <Card>
        <Box as="form" onSubmit={onSubmit}>
          <Field
            autoFocus
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

export default SignUp;
