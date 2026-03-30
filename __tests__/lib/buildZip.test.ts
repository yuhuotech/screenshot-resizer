import { buildOutputFilename, buildZipFilename } from '@/lib/buildZip'

describe('buildOutputFilename', () => {
  it('appends resolution and uses specified extension', () => {
    expect(buildOutputFilename('screen.png', 1242, 2688, new Set(), 'png')).toBe(
      'screen_1242x2688.png'
    )
  })

  it('uses jpg extension when specified', () => {
    expect(buildOutputFilename('photo.png', 1242, 2688, new Set(), 'jpg')).toBe(
      'photo_1242x2688.jpg'
    )
  })

  it('uses webp extension when specified', () => {
    expect(buildOutputFilename('shot.jpg', 1242, 2688, new Set(), 'webp')).toBe(
      'shot_1242x2688.webp'
    )
  })

  it('deduplicates colliding names with numeric suffix', () => {
    const seen = new Set<string>(['screen_1242x2688.png'])
    expect(buildOutputFilename('screen.png', 1242, 2688, seen, 'png')).toBe(
      'screen_1242x2688_2.png'
    )
  })

  it('increments suffix for multiple collisions', () => {
    const seen = new Set<string>(['screen_1242x2688.png', 'screen_1242x2688_2.png'])
    expect(buildOutputFilename('screen.png', 1242, 2688, seen, 'png')).toBe(
      'screen_1242x2688_3.png'
    )
  })
})

describe('buildZipFilename', () => {
  it('formats zip name with resolution', () => {
    expect(buildZipFilename(1242, 2688)).toBe('screenshots_1242x2688.zip')
  })
})
