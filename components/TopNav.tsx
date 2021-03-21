import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { Button, Flex } from "theme-ui";

import { UserNavMenu } from "./UserNavMenu";

export const TopNav: FC = () => (
  <Flex
    as="header"
    sx={{
      alignItems: "center",
      bg: "background",
      position: "sticky",
      top: 0,
      borderBottom: "solid",
      borderBottomColor: "border",
      borderBottomWidth: 1,
      zIndex: 1,
    }}
  >
    <Flex sx={{ flex: 1, justifyContent: "flex-start", mx: 4 }} />

    <Flex sx={{ flex: 1, justifyContent: "center" }}>
      <Link href="/">
        <Button variant="unstyled">
          <Image src="/logo.svg" height={56} width={56} />
        </Button>
      </Link>
    </Flex>

    <Flex sx={{ flex: 1, justifyContent: "flex-end", mx: 4 }}>
      <UserNavMenu />
    </Flex>
  </Flex>
);
