import JSZip from 'jszip'
import { saveAs } from 'file-saver'

export function buildOutputFilename(
  originalName: string,
  width: number,
  height: number,
  seen: Set<string>,
  ext: string
): string {
  const dotIndex = originalName.lastIndexOf('.')
  const base = dotIndex !== -1 ? originalName.slice(0, dotIndex) : originalName

  const candidate = `${base}_${width}x${height}.${ext}`

  if (!seen.has(candidate)) {
    seen.add(candidate)
    return candidate
  }

  let counter = 2
  while (counter < 10000) {
    const name = `${base}_${width}x${height}_${counter}.${ext}`
    if (!seen.has(name)) {
      seen.add(name)
      return name
    }
    counter++
  }
  throw new Error(`Could not deduplicate filename after 10000 attempts: ${candidate}`)
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
