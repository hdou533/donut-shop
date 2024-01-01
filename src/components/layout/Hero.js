import Image from 'next/image';
import { Right } from './../icons/Right';

const Hero = () => {

    return ( 
        <section className='hero py-8'>
            <div className='py-8'>
                <h1 className='text-4xl font-semibold'>Crafted with<br/>
                    <span className='text-primary'>Love</span>
                </h1>
                <p className='my-10 text-gray-500'>Our donuts are more than treats; they&apos;re an expression of our dedication to quality. Each one is handcrafted with love, using the finest ingredients to ensure a melt-in-your-mouth experience with every bite.</p>
            
                <div className='flex gap-8 text-sm'>
                    <button className='bg-primary flex gap-2 text-white px-4 py-2 rounded-full items-center uppercase'>
                        Order now
                        <Right />
                    </button>
                    <button className='flex gap-2 px-6 py-2 items-center text-gray-500 border-2 border-gray-400 hover:border-primary hover:text-primary transition-all rounded-full font-semibold'>
                        Learn more
                        <Right />
                    </button>
                </div>
            </div>
            <div className='relative'>
                <Image src={'/hero.jpg'} alt='donut' layout={'fill'} objectFit={'contain'} />
            </div>

        </section>
     );
}
 
export default Hero;
