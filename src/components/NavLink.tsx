import Link from "next/link";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";
import { NavLink as TNavLink, ThemeUIStyleObject } from "theme-ui";

export type NavLinkProps = {
  activeClassName?: string;
  children: ReactNode;
  href: string;
  sx?: ThemeUIStyleObject;
};

export const NavLink: FC<NavLinkProps> = ({
  activeClassName = "active",
  children,
  href,
  ...props
}: NavLinkProps) => {
  const router = useRouter();
  const isActive = router.pathname === href || router.asPath === href;
  const className = isActive ? activeClassName : "";

  return (
    <Link href={href} passHref>
      <TNavLink className={className} {...props}>
        {children}
      </TNavLink>
    </Link>
  );
};
