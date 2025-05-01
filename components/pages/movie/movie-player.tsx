'use client'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { getCldImageUrl } from 'next-cloudinary'
import { LoadingSpinner } from '@/components/common'
import { MovieUI as UI } from '@/components/styled'
import { Button, Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui'
import { thumbnailUrls } from '@/lib/constants'
import { randomize } from '@/lib/utils'

const CldVideoPlayer = dynamic(() => import('next-cloudinary').then((mod) => mod.CldVideoPlayer), {
  ssr: false,
  loading() {
    return <LoadingSpinner className='~size-14/16' />
  },
})

export function MoviePlayer({ movie }: MoviePlayerProps) {
  const { push } = useRouter()
  const { id, title, trailerUrl } = movie

  return (
    <UI.MoviePlayer.MainContainer>
      <UI.MoviePlayer.ButtonContainer>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size='icon' variant='outline' onClick={() => push('/', { scroll: false })}>
              <UI.MoviePlayer.IconArrow />
            </Button>
          </TooltipTrigger>
          <TooltipContent className='bg-background'>
            <UI.MoviePlayer.TooltipContent>Regresar a la página principal</UI.MoviePlayer.TooltipContent>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className='float-right' size='icon' variant='outline' onClick={() => location.reload()}>
              <UI.MoviePlayer.IconReload />
            </Button>
          </TooltipTrigger>
          <TooltipContent className='bg-background'>
            <UI.MoviePlayer.TooltipContent>¿El vídeo no se muestra? Recargar la página</UI.MoviePlayer.TooltipContent>
          </TooltipContent>
        </Tooltip>
      </UI.MoviePlayer.ButtonContainer>
      <UI.MoviePlayer.PlayerContainer>
        <CldVideoPlayer
          id={id}
          language='es'
          logo={false}
          poster={getCldImageUrl({ src: thumbnailUrls[randomize()] })}
          src={trailerUrl}
          colors={{
            accent: '#e11d48',
            base: '##0a0a0a',
            text: '#f43f5e',
          }}
          languages={{
            es: {
              Play: 'Reproducción',
              'Play Video': 'Reproduce el vídeo',
              Pause: 'Pausa',
              'Current Time': 'Tiempo reproducido',
              Duration: 'Duración total',
              'Remaining Time': 'Tiempo restante',
              Loaded: 'Cargado',
              Progress: 'Progreso',
              Fullscreen: 'Pantalla completa',
              'Non-Fullscreen': 'Salir de pantalla completa',
              Mute: 'Silenciar',
              Unmute: 'Activar sonido',
              'Playback Rate': 'Velocidad de reproducción',
              'You aborted the video playback': 'Ha interrumpido la reproducción del vídeo',
            },
          }}
          transformation={{
            color: '#f43f5e',
            gravity: 'north_west',
            overlay: {
              text: title,
              font_size: 15,
              font_weight: 'semibold',
              font_family: 'Source Sans Pro',
            },
          }}
          fluid
        />
      </UI.MoviePlayer.PlayerContainer>
    </UI.MoviePlayer.MainContainer>
  )
}

export interface MoviePlayerProps {
  movie: Models.Movie
}
