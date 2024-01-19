'use client'
import SectionHeader from '@/components/layout/SectionHeader';
import { CartContext, cartProductPrice } from '@/components/AppContext';
import { useContext, useEffect, useState } from 'react';

import { useProfile } from '@/components/UseProfile';
import CartProduct from '@/components/menu/CartProduct';
import AddressInputs from '@/components/layout/AddressInputs';


const CartPage = () => {
    const { cartProducts, removeCartProduct } = useContext(CartContext)
    const [address, setAddress] = useState({})

    const {data:profileData} = useProfile()

    let total = 0
    for (const p of cartProducts) {
        
        total += cartProductPrice(p)
    }

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

    return ( 
        <section className="my-8">
            <div className='text-center my-8'>
                <SectionHeader mainHeader={'Cart'}/>
            </div>
            <div className="grid grid-cols-2 gap-8">
                <div>
                    {cartProducts?.length === 0 && (
                        <div>Your shopping cart is empty.</div>
                    )}
                    {cartProducts?.length > 0 && (
                        cartProducts.map((product, index) => (
                            <CartProduct key={index} product={product} onRemove={removeCartProduct} index={index} />
                        ))
                    )}
                    <div className='text-right pr-10'>
                        Total: <span className='text-lg font-semibold pl-2'>${total}</span>
                    </div>
                </div>
                <div className='bg-gray-100 p-4 rounded-lg'>
                    <h2>Checkout</h2>
                    <form action="">
                        <AddressInputs
                            addressProps={address}
                            setAddressProp={handleAddressChange}
                        />
                    </form>
                    <button type='submit' className='mt-4'>Pay ${total}</button>
                </div>
            </div>
        </section>
     );
}
 
export default CartPage;
