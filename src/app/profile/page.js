'use client'
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Image from 'next/image';
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

    const handleFileChange = async (e) => {
        const files = e.target.files

        if (files?.length === 1) {
            const data = new FormData()
            data.set('file', files[0])
            
            const upload = fetch('/api/upload', {
                method: 'POST',
                body: data,
                        
            }).then(res => {
                if (res.ok) {
                    return res.json().then(link => {
                        setImage(link)
                    })
                }
                throw new Error('Something went wrong.')
            })
        
            


            await toast.promise(upload, {
                loading: 'Uploading...',
                success: 'Image Uploaded!',
                error: 'Error!'
            })
            


        }
    }


    if (status === 'loading') {
        return 'Loading...'
    }

    if (status === 'unauthenticated') {
        return redirect('/login')
    }


    return ( 
        <section>
            <h1 className="text-center text-primary text-4xl mb-8">Profile</h1>
            <div className='max-w-lg mx-auto min-h-60'>
               
                
                <div className=''>
                    <hr />
                    <form className='my-8' onSubmit={handleProfileUpdate}>
                        <div className='flex justify-between mb-8 gap-8'>
                            <div className='flex flex-col items-center justify-start gap-8 bg-gray-50 p-4 rounded-lg max-w-[160px]'>
                                {image && <Image src={image} alt='avatar' width={100} height={100} className='rounded-lg' /> }
                                
                                <label>
                                    <input type="file" className='hidden' onChange={handleFileChange}/>
                                    <span className='border border-gray-500 px-4 py-2 rounded-lg'>Edit</span>
                                </label>
                            </div>
                            <div className='grow'>
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
                            </div>
                        </div>
                        
                        <button type='submit' className=''>Save</button>
                    </form>
                    
                </div>
            </div>
        </section>
     );
}
 
export default ProfilePage;
