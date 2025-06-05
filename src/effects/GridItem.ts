import { gsap } from 'gsap'
import { getRandomNumber, map, lerp } from './utils'

let win = calcWinSize()
let mouse = {
  x: win.width / 2,
  y: win.height / 2,
}
window.addEventListener('resize', () => (win = calcWinSize()))
window.addEventListener('mousemove', (ev) => (mouse = getMousePos(ev)))

export default class GridItem {
  el: HTMLElement
  title?: string

  translation = { x: 0, y: 0 }
  rotation = { x: 0, y: 0 }

  xstart = getRandomNumber(70, 100)
  ystart = getRandomNumber(40, 65)
  rxstart = 5
  rystart = 10

  isLeft: boolean
  isTop: boolean

  ry: number
  rx: number
  tz: number

  requestId?: number
  hoverTimeout?: number

  tlHoverIn!: gsap.core.Timeline
  tlHoverOut!: gsap.core.Timeline

  constructor(el: HTMLElement) {
    this.el = el
    this.title = el.dataset.title

    const rect = el.getBoundingClientRect()

    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2

    this.isLeft = cx < win.width / 2
    this.isTop = cy < win.height / 2

    this.ry = this.isLeft
      ? map(cx, 0, win.width / 2, this.rystart, 0)
      : map(cx, win.width / 2, win.width, 0, -this.rystart)

    this.rx = this.isTop
      ? map(cy, 0, win.height / 2, -this.rxstart, 0)
      : map(cy, win.height / 2, win.height, 0, this.rxstart)

    this.tz = this.isLeft
      ? map(cx, 0, win.width / 2, 0, 0)
      : map(cx, win.width / 2, win.width, 0, 0)
    // : // ? map(cx, 0, win.width / 2, -200, -600)
    // map(cx, win.width / 2, win.width, -600, -200)

    gsap.set(this.el, {
      rotationX: this.rx,
      rotationY: this.ry,
      z: this.tz,
    })

    this.el.addEventListener('mouseenter', this.onMouseEnter.bind(this))
    this.el.addEventListener('mouseleave', this.onMouseLeave.bind(this))

    this.loop()
  }

  onMouseEnter() {
    this.hoverTimeout = window.setTimeout(() => {
      this.tlHoverOut?.kill()

      this.tlHoverIn = gsap.timeline().addLabel('start', 0).to(
        this.el,
        {
          duration: 0.8,
          ease: 'expo',
          scale: 1.1,
        },
        'start',
      )
    }, 10)
  }

  onMouseLeave() {
    if (this.hoverTimeout) window.clearTimeout(this.hoverTimeout)
    this.tlHoverIn?.kill()

    this.tlHoverOut = gsap.timeline().to(this.el, {
      duration: 1,
      ease: 'power4',
      x: 0,
      y: 0,
      scale: 1,
    })
  }

  loop() {
    if (!this.requestId) {
      this.requestId = requestAnimationFrame(() => this.move())
    }
  }

  stop() {
    if (this.requestId) {
      cancelAnimationFrame(this.requestId)
      this.requestId = undefined
    }
  }

  move() {
    this.requestId = undefined

    this.translation.x = lerp(
      this.translation.x,
      map(mouse.x, 0, win.width, -this.xstart, this.xstart),
      0.04,
    )

    this.translation.y = lerp(
      this.translation.y,
      map(mouse.y, 0, win.height, -this.ystart, this.ystart),
      0.04,
    )

    this.rotation.x = this.isTop
      ? lerp(
          this.rotation.x,
          map(mouse.y, 0, win.height / 2, this.rxstart, 0),
          0.04,
        )
      : lerp(
          this.rotation.x,
          map(mouse.y, win.height / 2, win.height, 0, -this.rxstart),
          0.04,
        )

    this.rotation.y = this.isLeft
      ? lerp(
          this.rotation.y,
          map(mouse.x, 0, win.width / 2, -this.rystart, 0),
          0.04,
        )
      : lerp(
          this.rotation.y,
          map(mouse.x, win.width / 2, win.width, 0, this.rystart),
          0.04,
        )

    gsap.set(this.el, {
      x: -this.translation.x,
      y: -this.translation.y,
      rotationX: -this.rx - this.rotation.x,
      rotationY: -this.ry - this.rotation.y,
    })

    this.loop()
  }
}

function calcWinSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  }
}

function getMousePos(e: MouseEvent) {
  return {
    x: e.clientX,
    y: e.clientY,
  }
}
