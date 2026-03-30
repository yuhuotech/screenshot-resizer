export async function resizeImage(
  file: File,
  width: number,
  height: number,
  outputMimeType: string
): Promise<Blob> {
  const quality = outputMimeType === 'image/jpeg' ? 0.92 : outputMimeType === 'image/webp' ? 0.9 : undefined

  const objectUrl = URL.createObjectURL(file)

  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        URL.revokeObjectURL(objectUrl)
        reject(new Error('Failed to get canvas 2D context'))
        return
      }
      ctx.drawImage(img, 0, 0, width, height)
      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(objectUrl)
          if (blob) resolve(blob)
          else reject(new Error('Canvas toBlob returned null'))
        },
        outputMimeType,
        quality
      )
    }
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl)
      reject(new Error('Failed to load image'))
    }
    img.src = objectUrl
  })
}
