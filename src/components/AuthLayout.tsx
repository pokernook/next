import Image from "next/image";
import { FC, ReactNode } from "react";
import { Container } from "theme-ui";

type AuthLayoutProps = {
  children: ReactNode;
};

export const AuthLayout: FC<AuthLayoutProps> = ({
  children,
}: AuthLayoutProps) => (
  <Container sx={{ maxWidth: 325, pt: 20, textAlign: "center" }}>
    <Image height={128} width={128} src="/logo.svg" />
    {children}
  </Container>
);
