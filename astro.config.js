import { defineConfig } from 'astro/config'
import lottie from 'astro-integration-lottie'

export default defineConfig({
  site: 'https://www.jam.fail',
  integrations: [lottie()],
})
