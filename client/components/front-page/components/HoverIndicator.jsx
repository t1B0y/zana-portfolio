import React from 'react';
import { HoverProject } from '../styled-components/Projects';
import { motion } from 'framer-motion';
const HoverIndicator = (props) => {
  return (
    <HoverProject>
      <motion.span
        initial={{ y: 80, rotate: 8 }}
        animate={{ y: 0, rotate: 0 }}
        transition={{ duration: 0.5 }}
      >
        Project numero 1 - the return of zanas
      </motion.span>
    </HoverProject>
  );
};

export default HoverIndicator;
