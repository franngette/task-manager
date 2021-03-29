import React from "react";
import { motion } from "framer-motion";

const AnimatedListItem = ({ index, children, delay = 0.05 }) => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: { delay: delay * index } }}
      exit={{ y: -100, opacity: 0 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedListItem;
