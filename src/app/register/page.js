'use client'
import Image from "next/image";
import { useState } from "react";



const RegisterPage = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [creatingUser, setCreatingUser] = useState(false)
    const [userCreated, setUserCreated] = useState(false)

    async function handleFormSubmit(ev) {
        ev.preventDefault()
        setCreatingUser(true)
        await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({email, password}),
            headers: {'Content-Type': 'application/json'}
        })
        setCreatingUser(false)
    }

    return ( 
        <section className="my-8">
            <h1 className="text-center text-primary text-4xl mb-8">
                Register
            </h1>
            <form action="" className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
                <input type="email" placeholder="email" value={email} onChange={ev => setEmail(ev.target.value)} disabled={creatingUser} />
                <input type="password" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)} disabled={creatingUser}/>
                <button type="submit" disabled={creatingUser}>Register</button>
                <div className="my-4 text-center text-gray-500">
                    or login with provider
                </div>
                <button className="flex gap-4 items-center justify-center">
                    <Image src={'/google.png'} width={20} height={20} alt="google"/>
                    Login with google
                </button>
            </form>
        </section>
     );
}
 
export default RegisterPage;
