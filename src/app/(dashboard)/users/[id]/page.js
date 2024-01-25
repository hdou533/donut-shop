'use client'

import { useProfile } from "@/components/UseProfile"
import UserForm from "@/components/layout/UserForm"
import UserTab from "@/components/layout/UserTab"
import { useParams } from "next/navigation"
import { useEffect,useState } from "react"
import toast from "react-hot-toast"

const EditUserPage = () => {

    const { loading, data } = useProfile()
    const [user, setUser] = useState(null)
    const { id } = useParams()
    

    useEffect(() => {
        fetch(`/api/profile?_id=${id}`).then(res => {
            res.json().then(user => {
               
                setUser(user)
            })
        })
    }, [id])
    
    const handleSaveProfile = async (e, data) => {
        e.preventDefault()

        const promise = new Promise(async (resolve, reject) => {
            const response = await fetch('/api/profile', {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({...data, _id:id})
            })

            if (response.ok) {
                resolve()
            } else {
                reject()
            }

           await toast.promise(promise, {
                loading: 'loading...',
                success: 'updated',
                error: 'Error'
            })
        })
    }

    
    if (loading) {
        return 'Loading user profile'
    }

    if (!data.admin) {
        return 'Not an admin'
    }

    
    return (
        <section className="max-w-xl mx-auto min-h-60">
            <UserTab isAdmin={data.admin} />
            <UserForm user={user} onSave={handleSaveProfile} />
            
        </section>
    )
}

export default EditUserPage
