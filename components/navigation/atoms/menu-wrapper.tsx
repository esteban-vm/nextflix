export function MenuWrapper({ children }: Props.WithChildren) {
  return (
    <div className='flex w-full items-center justify-between gap-0 lg:w-fit lg:justify-center lg:gap-2'>{children}</div>
  )
}
