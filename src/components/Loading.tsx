import { motion } from "framer-motion";
import { FC } from "react";
import { Flex } from "theme-ui";

// TODO: Display loading for a minimum amount of time
export const Loading: FC = () => (
  <Flex
    sx={{
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      width: "100vw",
    }}
  >
    <motion.img
      src="/logo.svg"
      initial={{ scale: 0.5 }}
      animate={{ scale: [0.5, 0.52, 0.5] }}
      transition={{ duration: 1.1, repeat: Infinity }}
    />
  </Flex>
);
