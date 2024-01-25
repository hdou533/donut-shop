'use client'
import SectionHeader from '@/components/layout/SectionHeader';
import { useEffect, useState } from 'react';
import {CartContext} from '@/components/AppContext';
import { useContext } from 'react';
import { useParams } from 'next/navigation';
import AddressInputs from '@/components/layout/AddressInputs';
import CartProduct from '@/components/menu/CartProduct';
import Link from 'next/link';
import { Right } from './../../../../components/icons/Right';

const OrderPage = () => {
    const { clearCart } = useContext(CartContext)
    const [order, setOrder] = useState()
    
    const { id } = useParams()
    
    
    useEffect(() => {
        if (typeof window.console !== 'undefined') {
            if (window.location.href.includes('clear-cart=1')) {
                clearCart()
            }
        }
       
        if (id) {
            
            fetch(`/api/orders?_id=${id}`).then(res => {
                res.json().then(orderData => {
                    
                    setOrder(orderData)
                    
                })
            })
        }
    }, [])

    let subtotal = 0
    if (order?.cartProducts) {
        for (const product of order?.cartProducts) {
            subtotal += product.price
        }
    }
    
    return ( 
        <section className='max-w-2xl mx-auto mt-8'>
            <Link href={'/orders'} className=''>
                <div className='text-primary italic flex gap-2 hover:underline hover:underline-offset-4'>
                    <Right /> 
                    <span>Back to Orders</span>
                   
                </div>
                
            </Link>
            <div className='text-center mt-4'>
                <SectionHeader mainHeader='Your order' />
                <div className='my-8'>
                    <p>Thanks for your order</p>
                    <p>We will message you when your order is on the way</p>
                </div>
            </div>
            

                {order && (
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-16 my-8'>
                        <div>
                            {order.cartProducts.map(product => (
                                <CartProduct product={product} key={product._id}/>
                            ))}
                            <div className='text-right text-md '>
                            Subtotal: <span className='font-semibold pl-2'>{subtotal}</span>
                            </div>
                            <div className='text-right text-md'>
                                Delivery: <span className='font-semibold pl-2'>${5}</span>
                            </div>
                            <div className='text-right text-md'>
                                Total: <span className='font-semibold pl-2'>${subtotal + 5}</span>
                            </div>
                        </div>
                        <div className='bg-gray-100 p-4 rounded-lg'>
                            <AddressInputs
                                disabled={true}
                                addressProps={order}
                            />
                        </div>
                        

                    </div>
            )}
            
                
        </section>
     );
}
 
export default OrderPage;
