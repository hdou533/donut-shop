'use client'

import { useProfile } from "@/components/UseProfile";
import UserTab from "@/components/layout/UserTab";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import MenuItemForm from '@/components/layout/MenuItemForm';
import DeleteBtn from './../../../../../components/DeleteBtn';

const EditMenuItemPage = () => {

    const router = useRouter()
    const [menuItem, setmenuItem] = useState(null)
    
    
    const { data: profileData, loading: profileLoading } = useProfile()
    const { id } = useParams()

    useEffect(() => {
        
        fetch(`/api/menu-items`).then(res => {
            res.json().then(items => {
                const item = items.find(i => i._id === id)
                setmenuItem(item)
            })
        })
    },[])

    const handleMenuItemSubmit = (e,data) => {
        e.preventDefault()
        data ={...data, _id:id}
        const createPromise = new Promise(async (resolve, reject) => {
            
            const response = await fetch('/api/menu-items/', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            if (response.ok) {
                
                resolve()
            } else {
                reject()
            }
        })

        toast.promise(createPromise, {
            loading: 'Updating the menu item...',
            success: 'Updated',
            error: 'error'
        })

        router.push('/menu-items')
        
    }

    const handleDeleteClick = async () => {
        const promise = new Promise(async (reslove, reject) => {
            const response = await fetch('/api/menu-items?_id='+id, {
                method: 'DELETE'
            })

            if (response.ok) {
                reslove()
            } else {
                reject
            }
        })

        await toast.promise(promise, {
            loading: 'Deleting...',
            success: 'Deleted',
            error: 'Error'
        })

        router.push('/menu-items')
    }



    if (profileLoading) {
        return 'Loading user info...'
    }

    if (!profileData.admin) {
        return 'Not an Admin'
    }
    
    return ( 
        <section className='max-w-xl mx-auto min-h-60 mb-8'>
            <UserTab isAdmin={profileData.admin} />
            <div className="max-w-lg mx-auto text-cetner">
                <Link href={'/menu-items'} className="">
                    <span className="underline underline-offset-4 hover:decoration-primary hover:text-primary ">Show all menu items</span>
                </Link>
            </div>
            
            <MenuItemForm menuItem={menuItem} onSubmit={handleMenuItemSubmit} />
            
            <div className="max-w-sm ml-auto mt-4">
                <DeleteBtn label={'Delete this item'} onDelete={handleDeleteClick}/>
            </div>
                
            
            
        </section>
     );
}
 
export default EditMenuItemPage;
