'use client'
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const Header = () => {
    const session = useSession()
    // console.log(session)
    const status = session.status
    const userData = session.data?.user
    const avatar = userData?.image
    

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
                    {status === 'authenticated' ? (
                        <>
                            <>
                                <img src={avatar} alt='avatar' className='w-6 h-6 rounded-full' />
                                <Link href={'/profile'} className='whitespace-nowrap text-gray-700'>Hi, {userName}</Link>
                            </>
                            
                            <button onClick={() => signOut()} className='bg-primary text-white rounded-full px-6 py-2'>Logout</button>
                        </>
                        
                    ) : (
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
