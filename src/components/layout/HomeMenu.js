
import Image from 'next/image';
import MenuItem from './../menu/MenuItem';
import SectionHeader from './SectionHeader';

const HomeMenu = () => {
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
                <SectionHeader subHeader={'Check out'} mainHeader={'Menu'}/>
            </div>
            <div className='grid grid-cols-3 gap-8'>
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
                <MenuItem />
            </div>
        </section>

     );
}
 
export default HomeMenu;
