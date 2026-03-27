import { buildOutputFilename, buildZipFilename } from '@/lib/buildZip'

describe('buildOutputFilename', () => {
  it('appends resolution to basename', () => {
    expect(buildOutputFilename('screen.png', 1242, 2688, new Map())).toBe(
      'screen_1242x2688.png'
    )
  })

  it('preserves jpeg extension', () => {
    expect(buildOutputFilename('photo.jpg', 1242, 2688, new Map())).toBe(
      'photo_1242x2688.jpg'
    )
  })

  it('uses png extension for webp input', () => {
    expect(buildOutputFilename('shot.webp', 1242, 2688, new Map())).toBe(
      'shot_1242x2688.png'
    )
  })

  it('deduplicates colliding names with numeric suffix', () => {
    const seen = new Map<string, number>([['screen_1242x2688.png', 1]])
    expect(buildOutputFilename('screen.png', 1242, 2688, seen)).toBe(
      'screen_1242x2688_2.png'
    )
  })

  it('increments suffix for multiple collisions', () => {
    const seen = new Map<string, number>([
      ['screen_1242x2688.png', 1],
      ['screen_1242x2688_2.png', 1],
    ])
    expect(buildOutputFilename('screen.png', 1242, 2688, seen)).toBe(
      'screen_1242x2688_3.png'
    )
  })
})

describe('buildZipFilename', () => {
  it('formats zip name with resolution', () => {
    expect(buildZipFilename(1242, 2688)).toBe('screenshots_1242x2688.zip')
  })
})
