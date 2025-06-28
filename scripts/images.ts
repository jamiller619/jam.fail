import imagemin from 'imagemin'
import imageminJpegtran from 'imagemin-jpegtran'
import imageminPngquant from 'imagemin-pngquant'

const files = await imagemin(['./src/content/projects/*{.jpg,png}'], {
  destination: 'build/images',
  plugins: [imageminJpegtran(), imageminPngquant({
    quality: [0.6, 0.8], // Adjust quality as needed
  })],
})
