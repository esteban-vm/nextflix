import Link from 'next/link'

export function Logo() {
  return (
    <Link
      className='text-shadow font-geist-mono font-extrabold uppercase text-rose-600 ~text-3xl/4xl text-shadow-background'
      href='/'
    >
      Nextflix
    </Link>
  )
}
