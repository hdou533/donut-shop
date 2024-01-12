'use client'
import { useProfile } from "@/components/UseProfile";
import UserTab from "@/components/layout/UserTab";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import DeleteBtn from './../../../components/DeleteBtn';





const CategoriesPage = () => {
    const [categoryName, setCategoryName] = useState('')
    const [categories, setCategories] = useState([])
    const [editCategory, setEditCategory] = useState(null)
    const { data: profileData, loading: profileLoading } = useProfile()

    useEffect(() => {
        fetchCategories()
    }, [])
    
    const fetchCategories = () => {
        fetch('/api/categories').then(res => {
            if (!res.ok) {
                throw new Error('response was not ok')
            }
            res.json().then(categories => {
                setCategories(categories)
            })
        })
    }
   
    const handleCategorySubmit = (e) => {
        e.preventDefault()

        const createPromise = new Promise(async (resolve, reject) => {
            const data = { name: categoryName }
            if (editCategory) {
                data._id = editCategory._id
            }
            const response = await fetch('/api/categories', {
                method: editCategory ? 'PUT' : 'POST',
                headers: {'Content-Type':'application/json'},
                body: JSON.stringify(data)
            })


            if (response.ok) {
                setCategoryName('')
                fetchCategories()
                setEditCategory(null)
                resolve()
            } else {
                reject()
            } 
        })
        
        toast.promise(createPromise, {
            success: editCategory ? 'Category updated' : 'New category created',
            loading: editCategory ? 'Updating category...' : 'Creating your new category...',
            error: 'Error!'
        })
        
    }

    const handleDeleteSubmit = async (_id) => {
        const promise = new Promise(async (resolve, reject) => {
           const response = await fetch('/api/categories?_id=' + _id, {
                method: 'DELETE',
           })
            
            if (response.ok) {
                resolve()
            } else {
                reject()
            }
        })

        

        await toast.promise(promise, {
            loading: 'Deleting...',
            success: 'Deleted',
            error: 'Error'
            
        })

        fetchCategories()
        
    }
    
    if (profileLoading) {
        return 'Loading user info...'
    }
    if (!profileData.admin) {
       return 'Not an admin'
   }
   
    return ( 
        <section className='max-w-lg mx-auto min-h-60 mb-8'>
            <UserTab isAdmin={profileData.admin} />
            
            <form className="mt-8" onSubmit={handleCategorySubmit}>
                <h2 className="my-4 font-semibold">
                    {editCategory ? `Update category: ${editCategory.name}` : 'Add a new category: '}
                </h2>
                <div className="flex items-end gap-4">
                    <div className="grow">
                        <input type="text" value={categoryName} onChange={e => setCategoryName(e.target.value)}/>
                    </div>
                    <div className="flex gap-2">
                        <button type='submit'>
                            {editCategory ? 'Update' : 'Create'}
                        </button>
                        <button type="button" onClick={() => {
                            setEditCategory(null)
                            setCategoryName('')
                        }}>Cancel</button>
                    </div>
                </div>
                <div className="flex"></div>
                
            </form>
            <h2 className="my-4 font-semibold">Current Categories</h2>
            <ul className="">
                {categories?.length > 0 && categories.map(c => (
                    <li key={c._id} className="mb-2 flex justify-between items-center gap-4 border rounded-lg p-2">
                        <div
                            className=" grow "
                            
                        >
                            {c.name}
                        </div>
                        <div className="flex gap-2 max-h-10">
                            <button onClick={() => {
                                setEditCategory(c)
                                setCategoryName(c.name)
                            }}>Edit</button>
                            <DeleteBtn
                                label={"Delete"}
                                onDelete={() => handleDeleteSubmit(c._id)} />
                        </div>
                    </li>
                ))}
            </ul>
        </section>
        
     );
}
 
export default CategoriesPage;
