"use client"

import { motion, stagger, useAnimate, useInView } from "framer-motion"
import { useEffect } from "react"

export const TypewriterEffect = ({
  words,
  className,
  cursorClassName,
}: {
  words: {
    text: string
    className?: string
  }[]
  className?: string
  cursorClassName?: string
}) => {
  // Split text into words and characters
  const wordsArray = words.map((word) => {
    return {
      ...word,
      characters: Array.from(word.text),
    }
  })

  const [scope, animate] = useAnimate()
  const isInView = useInView(scope)

  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          opacity: 1,
        },
        {
          duration: 0.3,
          delay: stagger(0.1),
        },
      )
    }
  }, [isInView, animate])

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline">
        {wordsArray.map((word, wordIndex) => {
          return (
            <div key={wordIndex} className="inline-block">
              {word.characters.map((character, charIndex) => {
                return (
                  <motion.span
                    initial={{
                      opacity: 0,
                    }}
                    key={charIndex}
                    className={("opacity-0", word.className)}
                  >
                    {character}
                  </motion.span>
                )
              })}
              &nbsp;
            </div>
          )
        })}
      </motion.div>
    )
  }

  return (
    <div className={("flex items-center", className)}>
      {renderWords()}
      <motion.span
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
        className={("inline-block h-12 w-[4px] bg-blue-500 dark:bg-[#00a8ff] rounded-sm", cursorClassName)}
      ></motion.span>
    </div>
  )
}

