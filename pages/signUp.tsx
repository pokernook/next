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

const SignUp = (): JSX.Element => {
  const { register, handleSubmit } = useForm();

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <Container sx={{ maxWidth: 325, pt: 20, textAlign: "center" }}>
      <Image height={128} width={128} src="/logo.svg" mb={2} />

      <Heading mb={3}>Create your account</Heading>

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

export default SignUp;
