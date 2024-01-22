'use client'
import { useProfile } from '@/components/UseProfile';

import UserTab from '@/components/layout/UserTab';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { dateTimeReadable } from '@/libs/datetime';




const OrdersPage = () => {

    const [orders, setOrders] = useState()
    const [loadingOrders, setLoadingOrders] = useState(false)
    const {loading, data:profileData} = useProfile()
    
    useEffect(() => {
        fetchOrders()
    }, [])
    
    const fetchOrders = () => {
        setLoadingOrders(true)
        fetch('/api/orders').then(res => {
            res.json().then(orders => {
                
                setOrders(orders.reverse())
                setLoadingOrders(false)
            })
        })
        
    }
    return ( 
        <section className='mt-8 max-w-2xl mx-auto'>
            <div className='text-center'>
                <UserTab isAdmin={profileData.admin}/> 
                
            </div>
            {loadingOrders && (
                <div>Loading orders...</div>
            )}
            <div className='mt-8 flex flex-col'>
                {orders && orders.map(order => (
                    <div
                        
                        key={order._id}
                        className='bg-gray-100 mb-2 p-4 rounded-lg grid grid-cols-5 items-center gap-8'
                    >
                        <div className='flex flex-col gap-2'>
                            <div>
                                <span className={(order.paid ? 'bg-green-500' : 
                                    'bg-red-500') + ' font-semibold text-white rounded-lg py-1 px-2'}>
                                    {order.paid ? 'Paid' : 'Unpaid'}
                                </span>
                            </div>      
                           
                        </div>
                        <div className='text-sm col-span-3'>
                            <div className='flex justify-between items-start'>
                                <span>{order.userEmail}</span>
                                <span className='text-gray-700 text-xs'>{dateTimeReadable(order.createdAt)}</span>
                            </div>
                        
                            <div className='overflow-wrap text-gray-700'>
                                {order.cartProducts.map(p => p.name).join(', ')}
                            </div>
                        </div>
                        
                        <Link
                            href={`/orders/${order._id}`}
                            className='border rounded-lg font-semibold p-2'
                        >
                            Show Order
                        </Link>
                        
                    </div>
                ))}
            </div>
            
        </section>
     );
}
 
export default OrdersPage;
