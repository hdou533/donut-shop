'use client'
import SectionHeader from '@/components/layout/SectionHeader';
import { useEffect } from 'react';
import {CartContext} from '@/components/AppContext';
import { useContext } from 'react';

const OrderPage = () => {
    const {clearCart} = useContext(CartContext)
    useEffect(() => {
        if (typeof window.console !== 'undefined') {
            if (window.location.href.includes('clear-cart=1')) {
                clearCart()
            }
        }
    },[])
    return ( 
        <section className='max-w-2xl mx-auto text-center mt-8'>
            <SectionHeader mainHeader='Your order' />
            <div className='my-4'>
                <p>Thanks for your order</p>
                <p>We will message you when your order is on the way</p>
            </div>
        </section>
     );
}
 
export default OrderPage;
