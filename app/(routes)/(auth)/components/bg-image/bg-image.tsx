import Image from 'next/image'
import loginBg from '@/images/login-bg.jpg'

export function BgImage() {
  return <Image alt='login-bg' className='object-cover object-center opacity-30' src={loginBg} fill />
}
