'use client'

import UserTab from "@/components/layout/UserTab";
import { useProfile } from '@/components/UseProfile';
import Link from "next/link";
import { useEffect, useState } from "react";
import { Edit } from './../../../components/icons/Edit';



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
            <div className="max-w-2xl mx-auto flex flex-col gap-2 my-8">
                
                    
                    {users?.length > 0 && users.map(user => (
                        <div key={user._id} className="bg-gray-100 px-4 py-2 rounded-lg grid grid-cols-5 gap-4 items-center">
                            <div className="col-span-4 flex flex-col sm:flex-row gap-2 sm:gap-8">
                                <span className="w-[96px] font-semibold  text-wrap">{user.name}</span>
                                <span className="text-gray-500 text-wrap">{user.email}</span>
                            </div>
                            
                            <span className="col-span-1 flex justify-center">
                                <Link href={`/users/${user._id}`} className="text-gray-700 p-0">
                                    <Edit />
                                </Link>
                            </span>
                            
                        </div>
                    ))}
                
            </div>
            
        </section>
    )
}


export default UsersPage
