import Link from 'next/link';

export default function Header() {
    return (
        <>
            <header className='flex items-center justify-between py-4'>
                <Link href={''} className='text-primary text-2xl font-semibold'>CrispyCrown Donuts</Link>
                <nav className='flex gap-8 items-center font-semibold text-gray-500'>
                    <Link href={''}>Home</Link>
                    <Link href={''}>Menu</Link>
                    <Link href={''}>About</Link>
                    <Link href={''}>Contact</Link>
                    <Link href={''} className='bg-primary text-white rounded-full px-6 py-2'>Login</Link>

                </nav>
            </header>
    
        </>
    )

}
