import studio from '@theatre/studio'
import { getProject, types } from '@theatre/core'

studio.initialize()

const project = getProject('jam.fail')
const sheet = project.sheet('Sheet 1')
const objJ = sheet.object('Logo / Letter J', {
  y: 0,
  opacity: types.number(1, { range: [0, 1] }),
})
const objA = sheet.object('Logo / Letter A', {
  y: 0,
  opacity: types.number(1, { range: [0, 1] }),
})
const objM = sheet.object('Logo / Letter M', {
  y: 0,
  opacity: types.number(1, { range: [0, 1] }),
})

const logo = document.getElementById('#logo')?.querySelector('svg')
const letters = logo?.querySelector('path')

objJ.onValuesChange((obj) => {
  letters[0].style.transform
})
