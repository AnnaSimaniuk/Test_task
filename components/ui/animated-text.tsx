"use client";
import { motion } from "framer-motion";

interface AnimatedTextProps {
  text: string;
}

const AnimatedText = ({ text }: AnimatedTextProps) => {
  const animatedText = text.split("");

  return (
    <div>
      {animatedText.map((char, index) => (
        <motion.span
          key={index}
          initial={{ filter: "blur(20px)", opacity: 0, scale: 2 }}
          whileInView={{ filter: "blur(0)", opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.1 * index,
          }}
          viewport={{ once: true }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
};

export default AnimatedText;
