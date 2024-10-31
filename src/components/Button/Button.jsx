import React from "react";
import "./Button.css";
import { motion, AnimatePresence } from "framer-motion";

const Button = ({ onClick, iconClass, value }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="btn"
      onClick={onClick}
    >
      <i className={iconClass}></i> {value}
    </motion.button>
  );
};

export default Button;
