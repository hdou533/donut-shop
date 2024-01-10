import Image from "next/image";
import toast from "react-hot-toast";


const EditableImage = ({ link, setLink }) => {
    
    const handleFileChange = async (e) => {
        const files = e.target.files

        if (files?.length === 1) {
            const data = new FormData()
            data.set('file', files[0])
            
            const upload = fetch('/api/upload', {
                method: 'POST',
                body: data,
                        
            }).then(res => {
                if (res.ok) {
                    return res.json().then(link => {
                        setLink(link)
                    })
                }
                throw new Error('Something went wrong.')
            })
        
            


            await toast.promise(upload, {
                loading: 'Uploading...',
                success: 'Image Uploaded!',
                error: 'Error!'
            })
            


        }
    }

    return ( 
        <>
            {link && <Image src={link} alt='image' width={140} height={140} className='rounded-lg' />}
            
            {!link && (
                <div className="bg-gray-200 p-4 text-gray-700 rounded-lg w-[140px] h-[140px] text-cetner">
                    No Image.
                </div>
            )}
        
            <label>
                <input type="file" className='hidden' onChange={handleFileChange}/>
                <span className='border border-gray-500 px-4 py-2 rounded-lg'>Edit</span>
            </label>
        </>
     );
}
 
export default EditableImage;
