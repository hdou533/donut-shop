
import Trash from '@/components/icons/Trash';
import Image from 'next/image';
import toast from 'react-hot-toast';


const CartProduct = ({product, onRemove,index}) => {
    return ( 
        <div
            // className='grid grid-cols-5 gap-4 items-start mb-2 border-b py-2'
            className='flex items-start justify-between mb-2 border-b py-2'
            key={product._id}
        >
            <div className='flex gap-4 w-[360px]'>
                <div className='relative w-16 h-16 rounded-lg'>
                    <Image src={product.image} fill alt='' style={{"objectFit": "cover"}} />
                </div>
                <div className='col-span-2'>
                    <h3 className='font-semibold'>{product.name}</h3>
                    <p className='text-sm text-gray-500'>1 Dozen</p>
                </div>
            </div>
            
            <div>
                <h3 className='font-semibold'>${product.price}</h3>
            </div>
            {!!onRemove && (
                <div className='relative -top-2'>
                    <button
                        type='button'
                        onClick={() => {
                            onRemove(index)
                            toast.success('Product removed')
                        }}
                        className='text-primary border-none'
                    >
                        <Trash />
                    </button>
                </div>
            )}
            
        </div>
     );
}
 
export default CartProduct
