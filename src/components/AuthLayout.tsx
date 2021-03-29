import Head from "next/head";
import Image from "next/image";
import { FC, ReactNode } from "react";
import { Container } from "theme-ui";

import { useUser } from "../hooks/use-user";
import { Loading } from "./Loading";

type AuthLayoutProps = {
  children: ReactNode;
};

export const AuthLayout: FC<AuthLayoutProps> = ({
  children,
}: AuthLayoutProps) => {
  const { fetching } = useUser({ hrefIfFound: "/" });

  if (fetching) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>PokerNook - Get in Here</title>
      </Head>

      <Container sx={{ maxWidth: 325, pt: 20, textAlign: "center" }}>
        <Image height={128} width={128} src="/logo.svg" />
        {children}
      </Container>
    </>
  );
};
