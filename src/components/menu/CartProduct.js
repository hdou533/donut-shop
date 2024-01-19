
import Trash from '@/components/icons/Trash';
import Image from 'next/image';
import toast from 'react-hot-toast';


const CartProduct = ({product, onRemove,index}) => {
    return ( 
        <div
            className='grid grid-cols-5 gap-4 items-start mb-2 border-b py-2'
            key={product._id}
        >
            <div className='w-16'>
                <Image src={product.image} width={128} height={128} alt='' />
            </div>
            <div className='col-span-2'>
                <h3 className='font-semibold'>{product.name}</h3>
                <p className='text-sm text-gray-500'>Size: 1 Dozen</p>
            </div>
            <div>
                <h3 className='font-semibold'>${product.price}</h3>
            </div>
            <div className='relative -top-1'>
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
        </div>
     );
}
 
export default CartProduct
