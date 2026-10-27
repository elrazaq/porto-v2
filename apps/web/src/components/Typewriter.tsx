import { useEffect, useState } from 'react'

export interface TypewriterProps {
  words: string[]
  typingSpeed?: number
  deletingSpeed?: number
  delayBetween?: number
  className?: string
}

export function Typewriter({
  words,
  typingSpeed = 65,
  deletingSpeed = 35,
  delayBetween = 1800,
  className = '',
}: TypewriterProps) {
  const [wordIndex, setWordIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[wordIndex % words.length]

    // Pause at full word
    if (!isDeleting && subIndex === currentWord.length) {
      const timer = setTimeout(() => setIsDeleting(true), delayBetween)
      return () => clearTimeout(timer)
    }

    // Switch to next word after deleting
    if (isDeleting && subIndex === 0) {
      const timer = setTimeout(() => {
        setIsDeleting(false)
        setWordIndex((prev) => (prev + 1) % words.length)
      }, 200)
      return () => clearTimeout(timer)
    }

    // Advance or decrement character
    const timer = setTimeout(
      () => {
        setSubIndex((prev) => prev + (isDeleting ? -1 : 1))
      },
      isDeleting ? deletingSpeed : typingSpeed,
    )

    return () => clearTimeout(timer)
  }, [subIndex, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, delayBetween])

  const currentWord = words[wordIndex % words.length]
  const displayText = currentWord.substring(0, subIndex)

  return (
    <span className={`inline-flex items-baseline font-bold ${className}`}>
      <span>{displayText}</span>
      <span
        aria-hidden="true"
        className="inline-block w-[2.5px] h-[1em] ml-1 bg-[#E63946] animate-pulse align-middle"
      />
    </span>
  )
}

