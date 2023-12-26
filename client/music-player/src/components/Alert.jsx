import React from "react";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { PiSmileySadBold } from "react-icons/pi";
import { motion } from "framer-motion";

const Alert = ({ type }) => {
  return (
    <motion.div
      initial={{ translateX: 200, opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      exit={{ translateX: 200, opacity: 0 }}
      key={type}
      className={`fixed top-12 right-12 px-4 py-2 rounded-md backdrop-blur-md flex items-center justify-center shadow-xl
      ${type === "success" && "bg-green-300"}
      ${type === "danger" && "bg-red-500"}
      `}
    >
      {type === "success" && (
        <div className="flex items-center justify-center gap-4 ">
          <MdOutlineEmojiEmotions className="text-3xl" />
          <p className="text-xl font-semibold">Data Saved</p>
        </div>
      )}
      {type === "danger" && (
        <div className="flex items-center justify-center gap-4 ">
          <PiSmileySadBold className="text-3xl" />
          <p className="text-xl font-semibold">
            Something went wrong.. Please try again!
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default Alert;
