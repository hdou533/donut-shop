'use client'
import SectionHeader from '@/components/layout/SectionHeader';
import { CartContext, cartProductPrice } from '@/components/AppContext';
import { useContext, useEffect, useState } from 'react';

import { useProfile } from '@/components/UseProfile';
import CartProduct from '@/components/menu/CartProduct';
import AddressInputs from '@/components/layout/AddressInputs';
import toast from 'react-hot-toast';


const CartPage = () => {
    const { cartProducts, removeCartProduct } = useContext(CartContext)
    const [address, setAddress] = useState({})

    const {data:profileData} = useProfile()

    let subtotal = 0
    for (const p of cartProducts) {
        
        subtotal += cartProductPrice(p)
    }

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (window.location.href.includes('canceled=1')) {
                toast.error('Payment failed')
            }
        }
    },[])

    useEffect(() => {
        if (profileData?.city) {
            const { phone, streetAddress, city, postalCode, country } = profileData
            const addressFormProfile = {
                phone,
                streetAddress,
                city,
                postalCode,
                country
            }
            setAddress(addressFormProfile)
        }
    },[profileData])

    const handleAddressChange = (propName, value) => {
        setAddress(prevAddress => ({...prevAddress, [propName]:value}))
    }

    const proceedToCheckout = async (e) => {
        e.preventDefault()
        const promise = new Promise(async (res, rej) => {
            const response = await fetch('/api/checkout', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    address,
                    cartProducts
                })
            })
            if (response.ok) {
                res()
                const link = await response.json()
                window.location = link
            } else {
                rej()
            }
        })

        toast.promise(promise, {
            loading: 'Preparing your order...',
            success: 'Redirecting to payment...',
            error: 'Something went wrong...Please try again later'
        })
       

        
    }
    if (cartProducts?.length === 0) {
        return (
            <section className='mt-8 mx-auto'>
                <div className='text-center my-8'>
                    <SectionHeader mainHeader={'Cart'} />
                    <div className='my-4'>Your shopping cart is empty.</div>
                </div>
                
            </section>
        )
    }
    // console.log(cartProducts)
    return ( 
        <section className="my-8 mx-auto">
            <div className='text-center my-8'>
                <SectionHeader mainHeader={'Cart'}/>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                    {/* {cartProducts?.length === 0 && (
                        <div>Your shopping cart is empty.</div>
                    )} */}
                    {cartProducts?.length > 0 && (
                        cartProducts.map((product, index) => (
                            <CartProduct key={index} product={product} onRemove={removeCartProduct} index={index} />
                        ))
                    )}
                    <div className='text-right pr-10'>
                        Subtotal: <span className='text-lg font-semibold pl-2'>${subtotal}</span>
                    </div>
                    <div className='text-right pr-10'>
                        Delivery: <span className='text-lg font-semibold pl-2'>${5}</span>
                    </div>
                    <div className='text-right pr-10'>
                        Total: <span className='text-lg font-semibold pl-2'>${subtotal + 5}</span>
                    </div>
                </div>
                <div className='bg-gray-100 p-4 rounded-lg'>
                    <h2>Checkout</h2>
                    <form onSubmit={proceedToCheckout}>
                        <AddressInputs
                            addressProps={address}
                            setAddressProp={handleAddressChange}
                        />
                        <button type='submit' className='mt-4'>Pay ${subtotal + 5}</button>
                    </form>
                   
                </div>
            </div>
        </section>
     );
}
 
export default CartPage;
