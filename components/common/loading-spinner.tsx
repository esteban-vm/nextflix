import { cn } from '@/lib/utils'

export function LoadingSpinner({ className }: Props.WithClassName) {
  return (
    <div className='absolute left-1/2 top-1/2 size-fit -translate-x-1/2 -translate-y-1/2'>
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
