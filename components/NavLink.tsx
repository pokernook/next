import Link from "next/link";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";
import { NavLink as TNavLink } from "theme-ui";

export type NavLinkProps = {
  activeClassName?: string;
  children: ReactNode;
  href: string;
};

export const NavLink: FC<NavLinkProps> = ({
  activeClassName = "active",
  children,
  href,
}: NavLinkProps) => {
  const router = useRouter();
  const isActive = router.pathname === href || router.asPath === href;
  const className = isActive ? activeClassName : "";

  return (
    <Link href={href} passHref>
      <TNavLink className={className}>{children}</TNavLink>
    </Link>
  );
};
