'use client'


import { useSession } from 'next-auth/react';
import UserTab from '@/components/layout/UserTab';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import UserForm from '@/components/layout/UserForm';
import { redirect } from 'next/navigation';
import {signOut} from "next-auth/react";


const ProfilePage = () => {
    const session = useSession()
    // console.log(session)
    const [user, setUser] = useState(null)
    const [admin, setAdmin] = useState(false)
    const [profileFetched, setProfileFetched] = useState(false)
    

    const status = session.status
    const userData = session.data?.user
   
    useEffect(() => {
        if (status === 'authenticated') {
           
            fetch('/api/profile').then(res => {
                res.json().then(data => {
                    setUser(data)
                    setAdmin(data.admin)
                    setProfileFetched(true)
                   
                })
            })
        }

    },[session, status])

    const handleProfileUpdate = async (e, data) => {
        e.preventDefault()
        const save = new Promise(async (res, rej) => {
            const response = await fetch('/api/profile', {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })

            response.ok ? res() : rej()
        })
        
        await toast.promise(save, {
            loading: 'Saving...',
            success: 'Profile updated!',
            error: 'Error',
        })
       
        
    }

    


     if (status === 'unauthenticated') {
        
        return redirect('/login')
    }
    
    if (status === 'loading' || !profileFetched) {
        return 'Loading...'
    }


    return ( 
        <section className='max-w-lg mx-auto min-h-60'>
            
        
            <UserTab isAdmin={admin} />
            <UserForm user={user} onSave={handleProfileUpdate} />
            <button
                onClick={() => {
                    signOut()
                    router.push('/')
                }} className='border-none text-gray-500 underline text-left pl-0 italic'>
                Logout
            </button>
            
        </section>
     );
}
 
export default ProfilePage;
