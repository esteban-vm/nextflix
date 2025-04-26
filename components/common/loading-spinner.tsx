import { cn } from '@/lib/utils'

export function LoadingSpinner({ className }: Props.WithClassName) {
  return (
    <div className='size-fit centered'>
      <div
        aria-label='Indicador de carga'
        className={cn(
          className,
          'aspect-square animate-spin rounded-full border-4 border-secondary-foreground/50 border-t-transparent'
        )}
      />
    </div>
  )
}
