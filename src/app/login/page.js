'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import {signIn, useSession } from 'next-auth/react'
import { redirect } from "next/navigation";
import Link from "next/link";




const LoginPage = () => {
        
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginInProgress, setLoginInProgress] = useState(false)


   
    async function handleFormSubmit(ev) {
        ev.preventDefault();
        setLoginInProgress(true);
        
        await signIn('credentials', {email, password, callbackUrl: '/profile'});
    
        setLoginInProgress(false);
      }

    

    return ( 
        <section className="my-8">
            <h1 className="text-center text-primary text-4xl mb-8">
                Login
            </h1>
            
            <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                <input type="email" name="email" placeholder="email" value={email} onChange={ev => setEmail(ev.target.value)} disabled={loginInProgress} className="mb-4"/>
                <input type="password" name="password" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)} disabled={loginInProgress} className="mb-4"/>
                <button type="submit" disabled={loginInProgress}>Login</button>
                <div className="my-4 text-center text-gray-500">
                    or login with provider
                </div>
                <button type="button" onClick={()=>signIn('google', {callbackUrl: '/'})} className="flex gap-4 items-center justify-center">
                    <Image src={'/google.png'} width={20} height={20} alt="google"/>
                    Login with google
                </button>
            </form>
            <div className="text-center text-gray-500 mt-4">
                No account? <Link href={'/register'} className="underline">Register here &raquo;</Link>
            </div>

        </section>
     );
}
 
export default LoginPage;
