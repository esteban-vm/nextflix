import Link from 'next/link'

export function Logo() {
  return (
    <Link
      className='font-geist-mono font-extrabold uppercase text-rose-600 ~text-3xl/4xl md:text-shadow md:text-shadow-background'
      href='/'
    >
      Nextflix
    </Link>
  )
}
