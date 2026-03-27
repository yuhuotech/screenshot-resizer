# Screenshot Resizer — Design Spec

**Date:** 2026-03-27
**Status:** Approved

## Overview

A single-page web tool for resizing screenshots to Apple App Store required dimensions. Built with Next.js + Tailwind CSS, processed entirely in the browser via Canvas API. No backend required.

## Requirements

- Upload 1 or more images (drag & drop or click to select)
- Select one target resolution from four App Store options
- Resize all images via force-stretch (Canvas drawImage) to exact target dimensions
- Output format matches input format (PNG→PNG, JPG→JPG)
- Download all resized images as a single ZIP file
- No authentication, no server-side processing

## Target Resolutions

| Label | Width | Height |
|-------|-------|--------|
| iPhone 竖屏 | 1242px | 2688px |
| iPhone 横屏 | 2688px | 1242px |
| iPhone 竖屏 Pro | 1284px | 2778px |
| iPhone 横屏 Pro | 2778px | 1284px |

## Architecture

**Stack:** Next.js 14 (App Router) + Tailwind CSS
**Image processing:** Browser Canvas API (`drawImage` forced stretch)
**ZIP packaging:** `jszip`
**File download:** `file-saver`
**No API Routes needed**

## Page Layout (Single Page)

1. **Header** — title and brief description
2. **Upload zone** — drag & drop or click, supports multiple files
3. **Thumbnail list** — uploaded images with remove button per item
4. **Resolution selector** — radio buttons, 4 options
5. **Action button** — "调整尺寸并下载 ZIP", disabled until images + resolution selected

## Data Flow

1. User drops/selects files → FileReader reads as ArrayBuffer
2. Files stored in React state as `{ file: File, preview: string }[]`
3. On button click: for each file, create `<canvas>` at target dimensions, draw image stretched, export to Blob
4. All Blobs added to JSZip, generated as ZIP, downloaded via file-saver

## Error Handling

- Only accept image/* files, reject others with inline message
- Show per-image error if Canvas export fails
- Button shows loading state during processing

## Testing

- Manually upload PNG and JPG, verify output dimensions with image preview
- Verify ZIP contains correct number of files
- Verify filenames preserved with original extension
