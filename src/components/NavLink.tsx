import Link from "next/link";
import { useRouter } from "next/router";
import { pathToRegexp } from "path-to-regexp";
import { FC, ReactNode } from "react";
import { NavLink as TNavLink, ThemeUIStyleObject } from "theme-ui";

export type NavLinkProps = {
  activeClassName?: string;
  children: ReactNode;
  exact?: boolean;
  href: string;
  sx?: ThemeUIStyleObject;
};

export const NavLink: FC<NavLinkProps> = ({
  activeClassName = "active",
  children,
  exact = true,
  href,
  ...props
}: NavLinkProps) => {
  const { asPath } = useRouter();
  const isActive = pathToRegexp(href, [], { sensitive: true, end: exact }).test(
    asPath
  );
  const className = isActive ? activeClassName : "";

  return (
    <Link href={href} passHref>
      <TNavLink className={className} {...props}>
        {children}
      </TNavLink>
    </Link>
  );
};
