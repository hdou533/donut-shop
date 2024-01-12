'use client'

import EditableImage from '@/components/layout/EditableImage';
import UserTab from '@/components/layout/UserTab';
import { useSession } from 'next-auth/react';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';



const ProfilePage = () => {
    const session = useSession()
    // console.log(session)
    const [username, setUsername] = useState('')
    const [image, setImage] = useState('')
    const [phone, setPhone] = useState('')
    const [streetAddress, setStreetAddres] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')
    const [admin, setAdmin] = useState(false)
    const [profileFetched, setProfileFetched] = useState(false)
    

    const status = session.status
    const userData = session.data?.user
   
    useEffect(() => {
        if (status === 'authenticated') {
            setUsername(userData.name)
            setImage(userData.image)
            fetch('/api/profile').then(res => {
                res.json().then(data => {
                    setPhone(data.phone)
                    setStreetAddres(data.streetAddress)
                    setPostalCode(data.postalCode)
                    setCity(data.city)
                    setCountry(data.country)
                    setAdmin(data.admin)
                    setProfileFetched(true)
                })
            })
        }

    },[session, status])

    const handleProfileUpdate = async (e) => {
        e.preventDefault()
        const save = new Promise(async (res, rej) => {
            const response = await fetch('/api/profile', {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: username,
                    image,
                    phone,
                    streetAddress,
                    postalCode,
                    city,
                    country,
                    admin
                })
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
        
        return (
            <div className="text-center my-8">
                Please log in.
            </div>
        )
    }
    
    if (status === 'loading' || !profileFetched) {
        return 'Loading...'
    }


    return ( 
        <section className='max-w-lg mx-auto min-h-60'>
            
        
            <UserTab isAdmin={admin} />
            
            <div className='flex gap-4 my-12'>
                <div className='flex flex-col gap-4 items-center bg-gray-100 p-4'>
                    <EditableImage link={image} setLink={setImage} />

                </div>
                
                <form className=' grow' onSubmit={handleProfileUpdate}>
                
                        <div className='flex flex-col gap-2'>
                            <label htmlFor="fullname">Full Name</label>
                            <input type="text" name="fullname" placeholder='Full Name' value={username} onChange={e => setUsername(e.target.value)} />

                            <label htmlFor="email">Email</label>
                            <input type="email" name='email' placeholder='Email' value={userData.email} disabled />

                            <label htmlFor="tel">Phone Number</label>
                            <input type="tel" name="tel" placeholder='Phone number' value={phone} onChange={e => setPhone(e.target.value)}/>
                            
                            <label htmlFor="streetAddress">Street Address</label>
                            <input type="text" name="streetAddress" placeholder='Street Address' value={streetAddress} onChange={e => setStreetAddres(e.target.value)} />

                            <label htmlFor="postalCode">Postal Code</label>
                            <input type="text" name="postalCode" placeholder='Postal Code' value={postalCode} onChange={e => setPostalCode(e.target.value)} />
                            
                            <label htmlFor="city">City</label>
                            <input type="text" name="city" placeholder='City' value={city} onChange={e => setCity(e.target.value)} />
                            
                            <label htmlFor="country">Country</label>
                            <input type="text" name='country' placeholder='Country' value={country} onChange={e => setCountry(e.target.value)}/>
                            {admin && <div className='flex gap-2'>
                                <label htmlFor="">Admin</label>
                                <input type="checkbox" checked={admin} />
                            </div>}
                       
                        </div>
                   
                    
                    <button type='submit' className='mt-4'>Save</button>
                </form>
                
            </div>
            
        </section>
     );
}
 
export default ProfilePage;
