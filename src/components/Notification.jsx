import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Notification = ({ message, onClose }) => {
  const [seconds, setSeconds] = useState(3);

  useEffect(() => {
    // Set up a countdown timer
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onClose(); // Automatically close the notification when time is up
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed top-5 right-3 bg-white font-font-bold text-rose6 text-sm md:text-md py-2 px-4 rounded shadow-md"
    >
      <div className="flex items-center gap-2 justify-between">
        <div className="text-xs text-center font-bold text-primary">
          {seconds}s
        </div>
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 text-lg font-bold">
          &times;
        </button>
      </div>
    </motion.div>
  );
};

export default Notification;
