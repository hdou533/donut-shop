'use client'
import Image from 'next/image';
import MenuItem from './../menu/MenuItem';
import SectionHeader from './SectionHeader';
import { useEffect, useState } from 'react';

const HomeMenu = () => {
    const [bestSellers, setBestSellers] = useState([])


    useEffect(() => {
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => {
                setBestSellers(menuItems.slice(-3))
            })
        })
    }, [])

    return ( 
        <section>
            <div className='relative'>
                <div className='h-24 w-24 absolute left-0 top-4 -z-10'>
                    <Image src={'/menu-bg.png'} alt="donuts" fill style={{ objectFit: 'contain'}} className='transform rotate-12'/>
                </div>
                <div className='h-24 w-24 absolute right-0 -top-8 -z-10'>
                    <Image src={'/menu-bg.png'} alt="donuts" fill style={{ objectFit: 'contain'}} className='transform -rotate-12'/>
                </div>
            </div>
           
            <div className="text-center my-16">
                <SectionHeader subHeader={'Check out'} mainHeader={'Our Best Menu'}/>
            </div>
            <div className='grid grid-cols-3 gap-8'>
                {bestSellers?.length > 0 && bestSellers.map(item => (
                    <MenuItem {...item} key={item._id}/>
                ))}

            </div>
        </section>

     );
}
 
export default HomeMenu;
