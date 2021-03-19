import Link from "next/link";
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

const LogIn = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <Container sx={{ maxWidth: 325, pt: 20, textAlign: "center" }}>
      <Image height={128} width={128} src="/logo.svg" mb={2} />

      <Heading mb={3}>Enter the &apos;Nook</Heading>

      <Card>
        <Box as="form" onSubmit={onSubmit}>
          <Field
            label="Email"
            name="email"
            type="email"
            ref={register({ required: true })}
            mb={2}
          />

          <Field
            label="Password"
            name="password"
            type="password"
            ref={register({ required: true })}
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

export default LogIn;
