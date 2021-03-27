import { FC, ReactNode } from "react";
import { AppearanceTypes } from "react-toast-notifications";
import { Alert } from "theme-ui";

import { FadeIn } from "./Animated";

type ToastProps = {
  appearance: AppearanceTypes;
  children: ReactNode;
};

export const Toast: FC<ToastProps> = ({ appearance, children }: ToastProps) => (
  <FadeIn>
    <Alert variant={appearance} sx={{ my: 2, minWidth: 300 }}>
      {children}
    </Alert>
  </FadeIn>
);
