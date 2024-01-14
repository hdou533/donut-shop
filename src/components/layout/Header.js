'use client'
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';


const Header = () => {
    const session = useSession()
   
    const userData = session.data?.user
    const avatar = userData?.image
    const router = useRouter()

    let userName = userData?.name || userData?.email
    if (userName && userName.includes(' ')) {
        userName = userName.split(' ')[0]
    }
    

    return (
        <>
            <header className='flex items-center justify-between py-4'>
                <div className='flex gap-8'>
                    <Link href={'/'} className='text-primary text-2xl font-semibold'>CrispyCrown Donuts</Link>
                    <nav className='flex gap-8 items-center font-semibold text-gray-500'>
                        <Link href={'/'}>Home</Link>
                        <Link href={''}>Menu</Link>
                        <Link href={''}>About</Link>
                        <Link href={''}>Contact</Link>
                        

                    </nav>
                </div>
                
                <div className='flex gap-4 items-center font-semibold'>
                    {session.data && (
                        <>
                            <>
                                <Image src={avatar} alt='avatar' width={24} height={24} className='rounded-full' />
                                <Link href={'/profile'} className='whitespace-nowrap text-gray-700'>Hi, {userName}</Link>
                            </>
                            
                            <button
                                onClick={() => {
                                    signOut()
                                    router.push('/')
                                }} className='bg-primary text-white rounded-full px-6 py-2'>Logout</button>
                        </>
                        
                    )}
                    {!session.data && (
                        <>
                            <Link href={'/login'} className='text-gray-500'>Login</Link>
                            <Link href={'/register'} className='bg-primary text-white rounded-full px-6 py-2'>Register</Link>
                        </>    
                    )}
                    
                    
                </div>
            </header>
    
        </>
    )

}

export default Header
