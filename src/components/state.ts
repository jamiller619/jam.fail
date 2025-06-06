type State = {
  win: {
    width: number
    height: number
  }
  mouse: {
    x: number
    y: number
  }
}

const win = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const state: State = {
  win,
  mouse: {
    x: win.width / 2,
    y: win.height / 2,
  },
}

window.addEventListener('resize', () => (state.win = calcWinSize()))
window.addEventListener('mousemove', (e) => (state.mouse = getMousePos(e)))

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

export { state as default, type State }
