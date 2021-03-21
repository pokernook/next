import { motion } from "framer-motion";
import { FC, ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
};

export const FadeIn: FC<FadeInProps> = ({ children }: FadeInProps) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
    {children}
  </motion.div>
);
