import { useState, useEffect } from 'react'

function Typewriter({ text, speed, delay }) {
  const [displayedText, setDisplayedText] = useState('')
  const [index, setIndex] = useState(0)

  function setTimeoutIf() {
    if (index < text.length) {
      const timeout = setTimeout(nextTextAndIndex, index === 0 ? delay : speed)
      return () => clearTimeout(timeout)
    }
  }

  function nextTextAndIndex() {
    setDisplayedText(updateDisplayedText)
    setIndex(index + 1)
  }

  function updateDisplayedText(prev) {
    return prev + text[index]
  }

  useEffect(setTimeoutIf, [index, text, speed])

  return (
    <span>
      {' '}
      {displayedText} {index > 0 && index < text.length && <span className="cursor">|</span>}
    </span>
  )
}

export default Typewriter
