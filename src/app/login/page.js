'use client'
import Image from "next/image";
import { useState } from "react";
import {signIn, useSession} from 'next-auth/react'
import { redirect } from "next/navigation";



const LoginPage = () => {
    const session = useSession()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loginOnPrgress, setLoginOnProgress] = useState(false)

   
    if (session.data?.user) {
        return redirect('/profile')
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault()
        setLoginOnProgress(true)
        await signIn('credentials', {email, password, })
        setLoginOnProgress(false)
    }

    return ( 
        <section className="my-8">
            <h1 className="text-center text-primary text-4xl mb-8">
                Login
            </h1>
            
            <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                <input type="email" name="email" placeholder="email" value={email} onChange={ev => setEmail(ev.target.value)} disabled={loginOnPrgress} />
                <input type="password" name="password" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)} disabled={loginOnPrgress}/>
                <button type="submit" disabled={loginOnPrgress}>Login</button>
                <div className="my-4 text-center text-gray-500">
                    or login with provider
                </div>
                <button type="button" onClick={()=>signIn('google', {callbackUrl: '/'})} className="flex gap-4 items-center justify-center">
                    <Image src={'/google.png'} width={20} height={20} alt="google"/>
                    Login with google
                </button>
            </form>

        </section>
     );
}
 
export default LoginPage;
