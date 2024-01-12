'use client'
import Image from "next/image";
import { useState } from "react";
import Link from 'next/link';
import { signIn } from "next-auth/react";



const RegisterPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [creatingUser, setCreatingUser] = useState(false)
    const [userCreated, setUserCreated] = useState(false)
    const [error, setError] = useState(false)

    async function handleFormSubmit(ev) {
        ev.preventDefault()
        setCreatingUser(true)
        setError(false)
        setUserCreated(false)
        const resp = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'}
        })
        if (!resp.ok) {
            setError(true)
        } else {
           setUserCreated(true) 
        }
        setCreatingUser(false)
        
    }

    return ( 
        <section className="my-8">
            <h1 className="text-center text-primary text-4xl mb-8">
                Register
            </h1>
            {userCreated && (
                <div className="text-center text-emerald-600">
                    User created. Please <Link href={"/login"} className="underline">log in &raquo;</Link> 
                </div>
            )}
            {error && (
                <div className="text-red-500 text-center">
                    Some error occurs. Please try again.
                </div>
            )}
            <form action="" className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                <input type="email" placeholder="email" value={email} onChange={ev => setEmail(ev.target.value)} disabled={creatingUser} className="mb-4"/>
                <input type="password" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)} disabled={creatingUser} className="mb-4"/>
                <button type="submit" disabled={creatingUser}>Register</button>
                <div className="my-4 text-center text-gray-500">
                    or login with provider
                </div>
                <button type="button" className="flex gap-4 items-center justify-center" onClick={() => signIn('google', {callbackUrl:'/'})}>
                    <Image src={'/google.png'} width={20} height={20} alt="google"/>
                    Login with google
                </button>
            </form>
            <div className="text-center text-gray-500 mt-4">
                Existing account? <Link href={'/login'} className="underline">Login here &raquo;</Link>
            </div>
        </section>
     );
}
 
export default RegisterPage;
