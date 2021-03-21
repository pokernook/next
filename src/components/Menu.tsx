import { FC } from "react";
import {
  Button,
  ButtonProps,
  Card,
  CardProps,
  Divider,
  Flex,
  FlexProps,
} from "theme-ui";

export const MenuCard: FC<CardProps> = ({ children, ...props }: CardProps) => (
  <Card variant="menu" {...props}>
    {children}
  </Card>
);

export const MenuDivider: FC = () => <Divider my={2} />;

export const MenuButton: FC<ButtonProps> = ({
  children,
  ...props
}: ButtonProps) => (
  <Button variant="menu" {...props}>
    {children}
  </Button>
);

export const MenuItem: FC<FlexProps> = ({ children, ...props }: FlexProps) => (
  <Flex sx={{ px: 3, py: 1, alignItems: "center" }} {...props}>
    {children}
  </Flex>
);
