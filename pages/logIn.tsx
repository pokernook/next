import Link from "next/link";
import { withUrqlClient } from "next-urql";
import { useForm } from "react-hook-form";
import {
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
import { useMutation } from "urql";

import { getClientConfig } from "../graphql/client";
import { logInDocument, logInMutationVariables } from "../graphql/types";

const LogIn = (): JSX.Element => {
  // TODO: Fix ESLint error
  // eslint-disable-next-line
  const { register, handleSubmit } = useForm<logInMutationVariables>();
  const [, logIn] = useMutation(logInDocument);

  const onSubmit = handleSubmit((data) => logIn(data));

  return (
    <Container sx={{ maxWidth: 325, pt: 20, textAlign: "center" }}>
      <Image height={128} width={128} src="/logo.svg" />

      <Heading mb={3}>Enter the &apos;Nook</Heading>

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

          <Button type="submit" variant="primary">
            Log in to PokerNook
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
    </Container>
  );
};

export default withUrqlClient(getClientConfig)(LogIn);
