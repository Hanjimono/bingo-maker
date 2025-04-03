import { motion } from "framer-motion"

export default function BingoWinner() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 0.5 }}
      className="z-10 absolute flex items-center justify-center text-9xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold"
    >
      <motion.span
        initial={{ scale: 0.9, rotate: -10 }}
        animate={{ scale: 1, color: "#2c4b8b", rotate: 10 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      >
        B
      </motion.span>
      <motion.span
        initial={{ scale: 1, rotate: 15 }}
        animate={{ scale: 0.9, color: "#91cadd", rotate: -15 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      >
        I
      </motion.span>
      <motion.span
        initial={{ scale: 0.9, rotate: -10 }}
        animate={{ scale: 1, color: "#2c4b8b", rotate: 10 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      >
        N
      </motion.span>
      <motion.span
        initial={{ scale: 1, rotate: 15 }}
        animate={{ scale: 0.9, color: "#91cadd", rotate: -15 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      >
        G
      </motion.span>
      <motion.span
        initial={{ scale: 0.9, rotate: -10 }}
        animate={{ scale: 1, color: "#2c4b8b", rotate: 10 }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
      >
        O
      </motion.span>
    </motion.div>
  )
}
