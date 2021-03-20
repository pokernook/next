import Link from "next/link";
import { withUrqlClient } from "next-urql";
import { useForm } from "react-hook-form";
import {
  Alert,
  Box,
  Button,
  Card,
  Container,
  Field,
  Heading,
  Image,
  Link as ThemeLink,
  Text,
} from "theme-ui";

import { FadeIn } from "../components/Animated";
import { getClientConfig } from "../graphql/client";
import { SignUpMutationVariables, useSignUpMutation } from "../graphql/types";

const SignUp = (): JSX.Element => {
  // TODO: Fix ESLint error
  // eslint-disable-next-line
  const { register, handleSubmit } = useForm<SignUpMutationVariables>();
  const [signUpResult, signUp] = useSignUpMutation();

  const onSubmit = handleSubmit((data) => signUp(data));

  return (
    <Container sx={{ maxWidth: 325, pt: 20, textAlign: "center" }}>
      <Image height={128} width={128} src="/logo.svg" />

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

          <Button type="submit" variant="primary">
            Sign up for PokerNook
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
    </Container>
  );
};

export default withUrqlClient(getClientConfig)(SignUp);
