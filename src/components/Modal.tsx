import { FC, ReactNode } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";
import {
  Box,
  BoxProps,
  Card,
  CardProps,
  Flex,
  FlexProps,
  Heading,
  IconButton,
} from "theme-ui";

type ModalPortalProps = {
  onClose: () => void;
  hasDimmedBackground?: boolean;
  children: ReactNode;
};

export const ModalPortal: FC<ModalPortalProps> = ({
  onClose,
  hasDimmedBackground = false,
  children,
}: ModalPortalProps) =>
  createPortal(
    <ModalWrapper hasDimmedBackground={hasDimmedBackground}>
      <ModalOverlay onClick={onClose} />
      {children}
    </ModalWrapper>,
    document.body
  );

export const ModalCard: FC = ({ children }: CardProps) => (
  <Card variant="modal">{children}</Card>
);

type ModalCloseProps = {
  onClose: () => void;
};

export const ModalClose: FC<ModalCloseProps> = ({
  onClose,
}: ModalCloseProps) => (
  <IconButton
    variant="close"
    sx={{ position: "absolute", top: 15, right: 15 }}
    onClick={onClose}
  >
    <FiX size={24} />
  </IconButton>
);

export const ModalHeader: FC = ({ children }: FlexProps) => (
  <Flex sx={{ alignItems: "center", width: "100%", minHeight: 60 }}>
    <Heading p={3}>{children}</Heading>
  </Flex>
);

export const ModalContent: FC = ({ children }: BoxProps) => (
  <Box sx={{ width: "100%" }}>{children}</Box>
);

export const ModalFooter: FC = ({ children }: FlexProps) => (
  <Flex
    sx={{
      alignItems: "center",
      justifyContent: "flex-end",
      width: "100%",
      minHeight: 60,
      p: 3,
    }}
  >
    {children}
  </Flex>
);

type ModalWrapperProps = {
  hasDimmedBackground: boolean;
  children: ReactNode;
};

const ModalWrapper: FC<ModalWrapperProps> = ({
  hasDimmedBackground,
  children,
}: ModalWrapperProps) => (
  <Flex
    sx={{
      bg: hasDimmedBackground && "rgba(0, 0, 0, 0.6)",
      alignItems: "center",
      justifyContent: "center",
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      zIndex: 10,
    }}
  >
    {children}
  </Flex>
);

type ModalOverlayProps = {
  onClick: () => void;
};

const ModalOverlay: FC<ModalOverlayProps> = ({
  onClick,
}: ModalOverlayProps) => (
  <Flex
    onClick={onClick}
    sx={{
      display: "none",
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      zIndex: -1,
    }}
  />
);
