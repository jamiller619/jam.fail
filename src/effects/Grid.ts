import GridItem from './GridItem'

type Elements = {
  el: HTMLElement | null
}

export default class Grid {
  dom: Elements = {
    el: null,
  }

  items: GridItem[] = []

  constructor(el: HTMLElement) {
    this.dom.el = el

    for (const child of this.dom.el.children) {
      const item = new GridItem(child as HTMLElement)

      this.items.push(item)
    }
  }
}
