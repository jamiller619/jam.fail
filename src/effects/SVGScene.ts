import { OrbitControls, SVGLoader } from 'three/examples/jsm/Addons.js'
import * as THREE from 'three'
import { Red } from 'open-props/src/props.colors.js'

const fillMaterial = new THREE.MeshBasicMaterial({ color: Red['--red-9'] })
// const strokeMaterial = new THREE.LineBasicMaterial({
//   color: '#00A5E6',
// })

type UpdateMap = {
  shape: THREE.Shape
  mesh: THREE.Mesh
  // lines: THREE.Line
}

const { innerWidth: ww, innerHeight: wh } = window

type SetupOptions = {
  rendererSize?: number
}

const DEFAULT_OPTIONS = {
  rendererSize: 1120,
}

export function setup(container?: Element | null, options?: SetupOptions) {
  if (!container) {
    console.warn(`Invalid "container" parameter in SVGScene.setup`)

    return
  }

  container.replaceChildren()

  const opts = { ...DEFAULT_OPTIONS, ...options }
  const scene = new THREE.Scene()
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  const camera = new THREE.PerspectiveCamera(50, 2, 0.1, 1000)
  const ambientLight = new THREE.AmbientLight('#888888')
  const pointLight = new THREE.PointLight('#ffffff', 2, 800)
  // const controls = new OrbitControls(camera, renderer.domElement)
  const animate = () => {
    renderer.render(scene, camera)
    // controls.update()

    requestAnimationFrame(animate)
  }

  renderer.setSize(opts.rendererSize, opts.rendererSize / 2)
  scene.add(ambientLight, pointLight)

  camera.position.z = 50
  // camera.position.x = 50
  // camera.position.y = 50
  // controls.enablePan = false

  container.append(renderer.domElement)

  window.addEventListener('resize', () => {
    camera.aspect = ww / wh
    camera.updateProjectionMatrix()
    renderer.setSize(opts.rendererSize, opts.rendererSize)
  })

  animate()

  return scene
}

export function render(extrusion: number, svg?: string | null) {
  if (!svg) {
    console.warn(`Invalid svg parameter on SVGScene.render`)

    return {
      object: null,
      update: null,
    }
  }

  const loader = new SVGLoader()
  const svgData = loader.parse(svg)
  const svgGroup = new THREE.Group()
  const updateMap: UpdateMap[] = []

  svgGroup.scale.y *= -1
  svgData.paths.forEach((path) => {
    const shapes = SVGLoader.createShapes(path)

    shapes.forEach((shape) => {
      const meshGeometry = new THREE.ExtrudeGeometry(shape, {
        depth: extrusion,
        bevelEnabled: false,
      })
      // const linesGeometry = new THREE.EdgesGeometry(meshGeometry)
      const mesh = new THREE.Mesh(meshGeometry, fillMaterial)
      // const lines = new THREE.LineSegments(linesGeometry, strokeMaterial)

      updateMap.push({ shape, mesh })
      svgGroup.add(mesh)
    })
  })

  const box = new THREE.Box3().setFromObject(svgGroup)
  const size = box.getSize(new THREE.Vector3())
  console.log(box, size)
  const yOffset = size.y / -2
  const xOffset = size.x / -2

  // Offset all of group's elements, to center them
  svgGroup.children.forEach((item) => {
    item.position.x = xOffset
    item.position.y = yOffset
  })

  return {
    object: svgGroup,
    update: (extrusion: number) => {
      updateMap.forEach((updateDetails) => {
        const meshGeometry = new THREE.ExtrudeGeometry(updateDetails.shape, {
          depth: extrusion,
          bevelEnabled: false,
        })
        const linesGeometry = new THREE.EdgesGeometry(meshGeometry)

        updateDetails.mesh.geometry.dispose()
        // updateDetails.lines.geometry.dispose()
        updateDetails.mesh.geometry = meshGeometry
        // updateDetails.lines.geometry = linesGeometry
      })
    },
  }
}
