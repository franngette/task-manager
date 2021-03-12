import React from "react";
import { motion } from "framer-motion";

const AnimationListItem = ({ index, children }) => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: 0.05 * index } }}
      exit={{ y: -100, opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimationListItem;
