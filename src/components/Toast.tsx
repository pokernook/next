import { FC } from "react";
import { ToastProps } from "react-toast-notifications";
import { Alert } from "theme-ui";

import { FadeIn } from "./Animated";

export const Toast: FC<ToastProps> = ({ appearance, children }: ToastProps) => (
  <FadeIn>
    <Alert variant={appearance} sx={{ my: 2, minWidth: 300 }}>
      {children}
    </Alert>
  </FadeIn>
);
