import Link from 'next/link';

const Header = () => {
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
                
                <div className='flex gap-6 items-center font-semibold'>
                    <Link href={'/login'} className='text-gray-500'>Login</Link>
                    <Link href={'/register'} className='bg-primary text-white rounded-full px-6 py-2'>Register</Link>
                </div>
            </header>
    
        </>
    )

}

export default Header
