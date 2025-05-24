import { animate, createTimeline } from 'animejs'
import TextWrapper from './TextWrapper'

export default function MovingLetters<T extends Element>(el: T | null) {
  if (!el) return

  TextWrapper(el, 'letter')

  const letters = el.querySelectorAll('.letter')
  const tl = createTimeline()

  tl.add(letters, {
    translateY: [50, 0],
    opacity: [0, 1],
    easing: 'easeOutExpo',
    duration: 700,
    delay: (_, i) => 100 + 30 * i,
  })
}
