'use client'
import Image from 'next/image';
export default function Header ()  {
  return (
    <div>
      <Image
        src="/images/headerLogo.png"
        alt="Google Maps"
        width={100}
        height={100}
        className='header-logo'
      />
    </div>
  )
}

