# App Store Screenshot Resizer

A lightweight, browser-based tool for batch-resizing screenshots to Apple App Store required dimensions. No uploads, no backend — everything runs locally in your browser.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green)

## Features

- **Drag & drop or click to upload** — supports PNG, JPG, and WEBP
- **Batch processing** — upload up to 20 images at once
- **4 App Store resolutions** supported out of the box
- **Forced-stretch resize** via Canvas API — guaranteed exact pixel dimensions
- **One-click ZIP download** — all resized images packed into a single ZIP
- **Filename deduplication** — handles duplicate filenames automatically
- **Zero data leaves your device** — all processing happens in the browser

## Supported Resolutions

| Device | Resolution |
|--------|------------|
| iPhone 竖屏 | 1242 × 2688 px |
| iPhone 横屏 | 2688 × 1242 px |
| iPhone 竖屏 Pro | 1284 × 2778 px |
| iPhone 横屏 Pro | 2778 × 1284 px |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Development

```bash
# Clone the repo
git clone https://github.com/your-username/screenshot-resizer.git
cd screenshot-resizer

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

### Tests

```bash
npm test
```

## Deploy to Vercel

The easiest way to deploy is via Vercel (free tier works great):

**Option A — One-click via Vercel CLI:**

```bash
npm run deploy
```

The first run will prompt you to log in and configure your project. Subsequent runs deploy directly to production.

**Option B — Connect GitHub repo:**

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Vercel auto-detects Next.js — just click Deploy

No `vercel.json` needed. Vercel handles everything automatically for Next.js projects.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript 5 |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) |
| Image processing | Browser Canvas API |
| ZIP packaging | [JSZip](https://stuk.github.io/jszip/) |
| File download | [FileSaver.js](https://github.com/eligrey/FileSaver.js/) |
| Testing | Jest + jest-canvas-mock |

## How It Works

1. User uploads images → validated client-side (type, size, count)
2. Preview URLs created via `URL.createObjectURL()`
3. On process: each image is drawn onto a `<canvas>` at target dimensions using `drawImage()` (forced stretch — no padding, no cropping)
4. Canvas exported to Blob via `toBlob()`, object URLs revoked to free memory
5. All Blobs added to a JSZip archive and downloaded via FileSaver

## Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Main page + state management
├── components/
│   ├── UploadZone.tsx          # Drag-and-drop upload
│   ├── ImageList.tsx           # Thumbnail grid
│   └── ResolutionSelector.tsx  # Resolution radio buttons
├── lib/
│   ├── types.ts                # Shared types + resolution constants
│   ├── resizeImage.ts          # Canvas resize logic
│   └── buildZip.ts             # ZIP assembly + filename deduplication
└── __tests__/
    └── lib/
        ├── resizeImage.test.ts
        └── buildZip.test.ts
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first.

1. Fork the repo
2. Create your branch: `git checkout -b feat/your-feature`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push: `git push origin feat/your-feature`
5. Open a Pull Request

## License

[MIT](LICENSE)
