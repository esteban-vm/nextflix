import dynamic from 'next/dynamic'

export const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false })
