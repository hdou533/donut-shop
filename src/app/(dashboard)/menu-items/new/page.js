'use client'

import { useProfile } from "@/components/UseProfile";
import EditableImage from "@/components/layout/EditableImage";
import UserTab from "@/components/layout/UserTab";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


const NewItemPage = () => {
    
    const [name, setName] = useState('')
    const [menuItems, setMenuItems] = useState([])
    const [image, setImage] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')

    const { data: profileData, loading: profileLoading } = useProfile()
    
    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setMenuItems(menuItems)
            })
        })
    },[])

    const handleMenuItemSubmit = (e) => {
        e.preventDefault()

        const createPromise = new Promise(async (resolve, reject) => {
            
            const response = await fetch('/api/menu-items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    image,
                    description,
                    price,
                })
            })

            if (response.ok) {
                
                resolve()
            } else {
                reject()
            }
        })

        toast.promise(createPromise, {
            loading: 'Creating new menu item...',
            success: 'New menu item created',
            error: 'error'
        })
        
    }

    if (profileLoading) {
        return 'Loading user info...'
    }

    if (!profileData.admin) {
        return 'Not an Admin'
    }


    return ( 
        <section className='max-w-lg mx-auto min-h-60 mb-8'>
            <UserTab isAdmin={profileData.admin} />
            <form className="mt-8" onSubmit={handleMenuItemSubmit}>
                <div className="flex gap-8">
                    <div className="flex flex-col gap-4 items-center">
                        <EditableImage link={image} setLink={setImage} />
                    </div>
                    <div className="grow">
                        <label htmlFor="">Item name</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)}/>
                        <label htmlFor="">Description</label>
                        <input type="text" value={description} onChange={e => setDescription(e.target.value)}/>
                        <label htmlFor="">Price</label>
                        <input type="text" value={price} onChange={e => setPrice(e.target.value)}/>
                        <button type="submit" className="mt-4">Save</button>
                    </div>
                </div>
            </form>
            
            
        </section>
     );
}
 
export default NewItemPage;
