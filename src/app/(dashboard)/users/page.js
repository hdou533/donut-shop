'use client'

import UserTab from "@/components/layout/UserTab";
import { useProfile } from '@/components/UseProfile';
import Link from "next/link";
import { useEffect, useState } from "react";



const UsersPage = () => {

    const [users, setUsers] = useState([])
    const {loading, data} = useProfile()

    useEffect(() => {
        fetch('/api/users').then(res => {
            res.json().then(users => {
                setUsers(users)
            })
        })
    },[])

    if (loading) {
        return 'Loading user info...'

    }

    if (!data.admin) {
        return 'Not an admin'
    }

    return (
        <section className="max-w-2xl mx-auto min-h-60">
            <UserTab isAdmin={true} />
            <div className="max-w-2xl mx-auto flex flex-col gap-2">
                
                    
                    {users?.length > 0 && users.map(user => (
                        <div key={user._id} className="bg-gray-100 px-4 py-2 rounded-lg grid grid-cols-3 gap-4 items-center">
                            <span className="font-semibold">{user.name}</span>
                            <span className="text-gray-500">{user.email}</span>
                            <span class="place-self-end">
                                <Link href={`/users/${user._id}`} className="button bg-green-500 text-white">
                                    Edit
                                </Link>
                            </span>
                            
                        </div>
                    ))}
                
            </div>
            
        </section>
    )
}


export default UsersPage
