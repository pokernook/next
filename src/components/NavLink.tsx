import Link from "next/link";
import { useRouter } from "next/router";
import { pathToRegexp } from "path-to-regexp";
import { FC, ReactNode } from "react";
import { IconType } from "react-icons";
import { Flex, NavLink as TNavLink } from "theme-ui";

export type NavLinkProps = {
  activeClassName?: string;
  children: ReactNode;
  exact?: boolean;
  href: string;
  Icon?: IconType;
};

export const NavLink: FC<NavLinkProps> = ({
  activeClassName = "active",
  children,
  exact = true,
  Icon,
  href,
}: NavLinkProps) => {
  const { asPath } = useRouter();
  const isActive = pathToRegexp(href, [], { sensitive: true, end: exact }).test(
    asPath
  );
  const className = isActive ? activeClassName : "";

  return (
    <Link href={href} passHref>
      <TNavLink className={className}>
        {Icon && (
          <Flex mr={3}>
            <Icon size={18} />
          </Flex>
        )}
        {children}
      </TNavLink>
    </Link>
  );
};
