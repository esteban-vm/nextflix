import { ImageResponse } from 'next/og'
import { size } from '@/lib/constants'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 26,
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#e11d48',
          textShadow: '#f43f5e 1px 1px 10px',
        }}
      >
        N
      </div>
    ),
    { ...size }
  )
}

export { contentType } from '@/lib/constants'
export { size }
