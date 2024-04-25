"use client";
import { motion } from "framer-motion";

const Loader = ({ chosenColour }: { chosenColour: string }) => {
  const colour = `bg-${chosenColour}-500`;
  return (
    <div className={`w-[80%] h-2 bg-white rounded-full mx-2`}>
      <motion.div
        className={`h-full rounded-full ${colour} flex w-[20%]`}
        animate={{
          x: [0, "400%", 0],
        }}
        transition={{ ease: "easeInOut", duration: 2, repeat: Infinity }}
      />
    </div>
  );
};

export default Loader;
