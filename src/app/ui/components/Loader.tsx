"use client";
import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className={`w-[80%] h-2 bg-gradient-to-r from-white via-white via-50% to-slate-300/65 rounded-full mx-2`}>
      <motion.div
        className={`h-full rounded-full bg-slate-300 flex w-[20%]`}
        animate={{
          x: [0, "400%", 0],
        }}
        transition={{ ease: "easeInOut", duration: 2, repeat: Infinity }}
      />
    </div>
  );
};

export default Loader;
