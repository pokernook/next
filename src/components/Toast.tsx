import { FC, ReactNode } from "react";

import { FadeIn } from "./Animated";

type ToastProps = {
  children: ReactNode;
};

export const Toast: FC<ToastProps> = ({ children }: ToastProps) => (
  <FadeIn>
    <div>{children}</div>
  </FadeIn>
);
