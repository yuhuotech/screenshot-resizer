import JSZip from 'jszip'
import { saveAs } from 'file-saver'

export function buildOutputFilename(
  originalName: string,
  width: number,
  height: number,
  seen: Map<string, number>
): string {
  const dotIndex = originalName.lastIndexOf('.')
  const base = dotIndex !== -1 ? originalName.slice(0, dotIndex) : originalName
  const ext = originalName.endsWith('.webp')
    ? 'png'
    : dotIndex !== -1
    ? originalName.slice(dotIndex + 1)
    : 'png'

  const candidate = `${base}_${width}x${height}.${ext}`

  if (!seen.has(candidate)) {
    seen.set(candidate, 1)
    return candidate
  }

  let counter = 2
  while (true) {
    const name = `${base}_${width}x${height}_${counter}.${ext}`
    if (!seen.has(name)) {
      seen.set(name, 1)
      return name
    }
    counter++
  }
}

export function buildZipFilename(width: number, height: number): string {
  return `screenshots_${width}x${height}.zip`
}

export async function downloadAsZip(
  blobs: { blob: Blob; filename: string }[],
  zipFilename: string
): Promise<void> {
  const zip = new JSZip()
  for (const { blob, filename } of blobs) {
    zip.file(filename, blob)
  }
  const zipBlob = await zip.generateAsync({ type: 'blob' })
  saveAs(zipBlob, zipFilename)
}
