"use client"

import { AnimatePresence, motion } from "framer-motion"

interface AnimatedHrefProps {
  color: string
  href?: string
  text: React.ReactElement | string
  onClick?: () => void
  target?: string
}

export const AnimatedHref: React.FC<AnimatedHrefProps> = ({
  color,
  href,
  text,
  onClick,
  target,
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.a
        href={href}
        onClick={onClick}
        className="relative flex items-center justify-center overflow-hidden cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        target={target}
      >
        <motion.span
          key="action"
          className="relative block h-full w-full font-semibold"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          style={{ color: color }}
        >
          {text}
        </motion.span>
      </motion.a>
    </AnimatePresence>
  )
}
