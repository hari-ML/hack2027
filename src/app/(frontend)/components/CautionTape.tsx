'use client'

import React from 'react'

const TAPE_ITEMS = [
  { text: 'HACK 2027', highlight: true },
  { text: '•', bullet: true },
  { text: 'INNOVATION ZONE' },
  { text: '•', bullet: true },
  { text: '24-HOUR HACKATHON' },
  { text: '•', bullet: true },
  { text: 'BUILD THE FUTURE' },
  { text: '•', bullet: true },
  { text: 'DO NOT CROSS', highlight: true },
  { text: '•', bullet: true },
  { text: 'SIMATS ENGINEERING' },
  { text: '•', bullet: true },
  { text: 'LIMITLESS INNOVATION' },
  { text: '•', bullet: true },
]

export function CautionTape() {
  return (
    <div className="caution-tape-wrapper" aria-hidden="true">
      <div className="caution-tape-track">
        <div className="caution-tape-content">
          {TAPE_ITEMS.map((item, idx) => (
            <span
              key={`tape-1-${idx}`}
              className={
                item.bullet ? 'tape-bullet' : item.highlight ? 'tape-highlight' : 'tape-text'
              }
            >
              {item.text}
            </span>
          ))}
        </div>
        <div className="caution-tape-content" aria-hidden="true">
          {TAPE_ITEMS.map((item, idx) => (
            <span
              key={`tape-2-${idx}`}
              className={
                item.bullet ? 'tape-bullet' : item.highlight ? 'tape-highlight' : 'tape-text'
              }
            >
              {item.text}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
