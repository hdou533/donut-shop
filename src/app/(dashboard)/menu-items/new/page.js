'use client'

import { useProfile } from "@/components/UseProfile";
import UserTab from "@/components/layout/UserTab";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import MenuItemForm from '@/components/layout/MenuItemForm';



const NewItemPage = () => {
    
    
    const router = useRouter()
    const {loading, data} = useProfile();
    


    const handleMenuItemSubmit = (e, data) => {
        e.preventDefault()

        const createPromise = new Promise(async (resolve, reject) => {
            
            const response = await fetch('/api/menu-items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            if (response.ok) {
                
                resolve()
                router.push('/menu-items')
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

    if (loading) {
        return 'Loading user info...';
      }
    
      if (!data.admin) {
        return 'Not an admin.';
      }
    


    return ( 
        <section className='max-w-lg mx-auto min-h-60 mb-8'>
            <UserTab isAdmin={data.admin} />
            <div className="max-w-lg mx-auto text-cetner">
                <Link href={'/menu-items'} className="">
                    <span className="underline underline-offset-4 hover:decoration-primary hover:text-primary ">Show all menu items</span>
                </Link>
            </div>
            <MenuItemForm menuItem={null} onSubmit={handleMenuItemSubmit} />
                       
            
        </section>
     );
}
 
export default NewItemPage;
