import { resizeImage } from '@/lib/resizeImage'

describe('resizeImage', () => {
  it('returns a Blob with specified png format', async () => {
    const mockFile = new File([''], 'test.png', { type: 'image/png' })
    const blob = await resizeImage(mockFile, 1242, 2688, 'image/png')
    expect(blob).toBeInstanceOf(Blob)
    expect(blob.type).toBe('image/png')
  })

  it('returns jpeg mime type when output is jpeg', async () => {
    const mockFile = new File([''], 'test.png', { type: 'image/png' })
    const blob = await resizeImage(mockFile, 1242, 2688, 'image/jpeg')
    expect(blob.type).toBe('image/jpeg')
  })

  it('returns webp mime type when output is webp', async () => {
    const mockFile = new File([''], 'test.jpg', { type: 'image/jpeg' })
    const blob = await resizeImage(mockFile, 1242, 2688, 'image/webp')
    expect(blob.type).toBe('image/webp')
  })

  it('returns png mime type when output is png regardless of input', async () => {
    const mockFile = new File([''], 'test.webp', { type: 'image/webp' })
    const blob = await resizeImage(mockFile, 1242, 2688, 'image/png')
    expect(blob.type).toBe('image/png')
  })
})
