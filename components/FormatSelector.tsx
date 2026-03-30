'use client'

import { OutputFormat, OUTPUT_FORMATS } from '@/lib/types'

interface Props {
  selected: OutputFormat
  onChange: (format: OutputFormat) => void
}

export default function FormatSelector({ selected, onChange }: Props) {
  return (
    <div className="w-full">
      <p className="text-sm font-medium text-gray-700 mb-2">输出格式</p>
      <div className="grid grid-cols-3 gap-2">
        {OUTPUT_FORMATS.map((fmt) => (
          <label
            key={fmt.ext}
            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
              selected.ext === fmt.ext
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300 bg-white'
            }`}
          >
            <input
              type="radio"
              name="format"
              className="accent-blue-500"
              checked={selected.ext === fmt.ext}
              onChange={() => onChange(fmt)}
            />
            <span className="text-sm text-gray-700">{fmt.label}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
