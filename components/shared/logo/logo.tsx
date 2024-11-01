import Link from 'next/link'

export function Logo() {
  return (
    <Link
      className='font-geist-mono text-3xl font-extrabold uppercase text-rose-600 md:text-shadow md:text-shadow-background'
      href='/'
    >
      Nextflix
    </Link>
  )
}
