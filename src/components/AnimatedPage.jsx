import React from 'react';
import { motion } from 'framer-motion';

// This new line explicitly uses the 'motion' import, which fixes the error.
const MotionDiv = motion.div;

const animations = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const AnimatedPage = ({ children }) => {
  return (
    <MotionDiv
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5 }}
    >
      {children}
    </MotionDiv>
  );
};