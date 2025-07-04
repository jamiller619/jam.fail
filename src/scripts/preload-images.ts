export function preloadImage(url?: string | null): Promise<void> {
  if (!url) {
    return Promise.resolve()
  }

  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = url
    img.onload = () => resolve()
    img.onerror = (err) => reject(err)
  })
}
