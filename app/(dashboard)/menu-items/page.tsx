'use client'

import { useProfile } from "@/components/UseProfile"
import UserTab from "@/components/layout/UserTab"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"





const MenuItemsPage = () => {
    const [menuItems, setMenuItems] = useState([])
    const { data: profileData, loading: profileLoading } = useProfile()

    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setMenuItems(menuItems)
            })
        })
    },[])

    if (profileLoading) {
        return 'Loading user info...'
    }

    if (!profileData.admin) {
        return 'Not an Admin'
    }
    

    return (
        <section className="my-8 max-w-2xl mx-auto">
            <UserTab isAdmin={true} />
            <div className="mt-8">
                <Link
                    className="button flex"
                    href={'/menu-items/new'}>
                    <span>Crete new menu item</span>
                    
                </Link>
            </div>
            <div>
                <h2 className="text-sm text-gray-500 my-8">Edit menu item:</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {menuItems?.length > 0 && menuItems.map(item => (
                    <Link
                        key={item._id}
                        href={'/menu-items/edit/'+item._id}
                        className="bg-gray-200 rounded-lg p-4 flex flex-col gap-4"
                    >
                        <div className="relative w-[160px] h-[160px] mx-auto">
                                {item.image && (
                                    <Image
                                        className="rounded-md"
                                        fill
                                        src={item.image}
                                        alt={''}
                                        style={{"object-fit": "cover"}}
                                        
                                    />
                                    )}
                               
                        </div>
                        <div className="text-center font-semibold">
                            {item.name}
                        </div>
                    </Link>
                    ))}
                </div>
            </div>
      </section>
    )
}

export default MenuItemsPage
