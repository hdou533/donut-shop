import Image from "next/image";




const MenuItem = () => {
    return ( 
        <div className='bg-pink-100 p-8 rounded-lg text-center hover:bg-red-100 hover:shadow-xl hover:shadow-black/20 transition-all'>
            <Image src="/sprinkles.png" width={300} height={240} alt="donut" />
            <h4 className='text-primary font-semibold'>Sprinkles Donut</h4>
            <p className='mt-4'>$25 Per Dozen </p>
            <button className="mt-4 bg-primary rounded-full text-white px-6 py-2">Add to cart</button>
        </div>
     );
}
 
export default MenuItem;
