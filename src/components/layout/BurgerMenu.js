'use client'

import Menu from "@/components/icons/Menu"
import Link from "next/link"
import { useState } from 'react'
import { Close } from './../icons/Close';
import Image from "next/image";
import { signOut, useSession } from 'next-auth/react';


const BurgerMenu = () => {
    const [toggle, setToggle] = useState(false)
    const session = useSession()
    const userData = session.data?.user
    const avatar = userData?.image
    let userName = userData?.name || userData?.email
    if (userName && userName.includes(' ')) {
        userName = userName.split(' ')[0]
    }
    
    return (
        <div>

            <button
                className="border-none text-primary pl-0"
                onClick={() => setToggle(!toggle)}
            >
                <Menu w={8} h={8} />
            </button>
            
            {toggle && (
                <div className="fixed top-0 left-0 w-4/5 h-screen bg-primary/95 z-10 font-semibold text-xl text-white px-4 py-8 flex flex-col justify-start items-center gap-4 sm:hidden">
                    <button 
                        className="flex border-none text-white justify-end"
                        onClick={() => setToggle(!toggle)}
                    >
                        <Close w={8} h={8} />
                    </button>
                
                    <nav className='flex flex-col w-full items-center mt-12 gap-8'>
                        
                        <Link href={'/'}>Home</Link>
                        <Link href={'/menu'}>Menu</Link>
                        <Link href={'/#about'}>About</Link>
                        <Link href={'/#contact'}>Contact</Link>
                        <div classNamw="flex items-center gap-8">
                        {session.data && (
                            <>
                                <div className="flex gap-4 mb-4 items-center">
                                    <Image src={avatar} alt='avatar' width={24} height={24} className='rounded-full' />
                                    <Link href={'/profile'} className='whitespace-nowrap text-gray-700'>Hi, {userName}</Link>
                                </div>
                                
                                <button
                                    onClick={() => {
                                        signOut()
                                        router.push('/')
                                    }} className='bg-primary text-white rounded-full px-4 py-2'>Logout</button>
                            </>
                            
                        )}
                        {!session.data && (
                            <>
                                <Link href={'/login'} className='text-gray-500'>Login / </Link>
                                <Link href={'/register'} className='text-gray-500'>Register</Link>
                            
                            </>    
                        )}
                        </div>


                    </nav>
                </div>
            )}
        </div>
    )
}

export default BurgerMenu
