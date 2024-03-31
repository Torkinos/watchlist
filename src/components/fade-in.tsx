'use client'

import { motion } from 'framer-motion'
import { FC, type ReactNode } from 'react'

export interface FadeInProps {
  children: ReactNode
  delay?: number
  className?: string
  orientation?: 'vertical' | 'horizontal'
}

export const FadeIn: FC<FadeInProps> = ({ children, delay, orientation }) => {
  const transition = {
    animate: { opacity: 1, y: 0 },
    initial: { opacity: 0, y: 10 },
    transition: { delay, duration: 0.35 },
  }

  const transition2 = {
    animate: { opacity: 1, x: 0 },
    initial: { opacity: 0, x: -20 },
    transition: { delay, duration: 0.35 },
  }

  if (orientation === 'horizontal') {
    return (
      <motion.div
        animate={transition2.animate}
        initial={transition2.initial}
        transition={transition2.transition}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      animate={transition.animate}
      initial={transition.initial}
      transition={transition.transition}
    >
      {children}
    </motion.div>
  )
}
