import {
  Container,
  Heading,
  Card,
  Box,
  Field,
  Button,
  Text,
  Image,
  Link as ThemeLink,
} from "theme-ui";
import Link from "next/link";

const LogIn = () => (
  <Container sx={{ maxWidth: 325, pt: 20, textAlign: "center" }}>
    <Image height={128} width={128} src="/logo.svg" mb={2} />

    <Heading mb={3}>Enter the &apos;Nook</Heading>

    <Card>
      <Box as="form">
        <Field label="Email" name="email" type="email" mb={2} />

        <Field label="Password" name="password" type="password" mb={3} />

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

export default LogIn;
