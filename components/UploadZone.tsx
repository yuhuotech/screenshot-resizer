'use client'

import { useRef, useState } from 'react'

const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/webp']
const MAX_SIZE_MB = 20
const MAX_FILES = 20

interface Props {
  onFilesAccepted: (files: File[]) => void
  currentCount: number
}

export default function UploadZone({ onFilesAccepted, currentCount }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)

  function validate(files: File[]): { valid: File[]; errors: string[] } {
    const valid: File[] = []
    const errors: string[] = []
    const remaining = MAX_FILES - currentCount

    for (const file of files) {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        errors.push(`${file.name}：仅支持 PNG / JPG / WEBP 格式`)
        continue
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        errors.push(`${file.name}：文件大小不能超过 ${MAX_SIZE_MB}MB`)
        continue
      }
      valid.push(file)
    }

    if (valid.length > remaining) {
      errors.push(`最多支持 ${MAX_FILES} 张图片，已截取前 ${remaining} 张`)
      return { valid: valid.slice(0, remaining), errors }
    }

    return { valid, errors }
  }

  function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return
    const { valid, errors } = validate(Array.from(files))
    setError(errors.length > 0 ? errors.join('\n') : null)
    if (valid.length > 0) onFilesAccepted(valid)
  }

  return (
    <div className="w-full">
      <div
        className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
          dragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-blue-400 bg-gray-50'
        }`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          handleFiles(e.dataTransfer.files)
        }}
      >
        <p className="text-gray-500 text-sm">
          拖拽图片到此处，或<span className="text-blue-500 font-medium"> 点击上传</span>
        </p>
        <p className="text-gray-400 text-xs mt-1">支持 PNG / JPG / WEBP，单张最大 20MB，最多 20 张</p>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-500 whitespace-pre-line">{error}</p>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
    </div>
  )
}
