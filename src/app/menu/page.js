'use client'
import { useEffect,useState } from "react";
import SectionHeader from './../../components/layout/SectionHeader';
import MenuItem from "@/components/menu/MenuItem";


const MenuPage = () => {
    const [categories, setCategories] = useState([])
    const [menuItems, setMenuItems] = useState([])

    useEffect(() => {
        fetch('/api/categories').then(res => {
            res.json().then(categories => setCategories(categories))
        }) 
        
        fetch('/api/menu-items').then(res => {
            res.json().then(menuItems => setMenuItems(menuItems))
        })
    },[])

    return ( 
        <section className="mt-8">
            {categories?.length > 0 && categories.map(category => (
                <div key={category._id}>
                    <div className="text-center my-8">
                        <SectionHeader mainHeader={category.name}/>
                    </div>
                    <div className="grid grid-cols-3 gap-8">
                         {menuItems.filter(m => m.category === category._id).map(item => (
                        <MenuItem {...item} key={item._id} />
                    ))}
                    </div>
                   
                </div>
                
            ))}
        </section>
     );
}
 
export default MenuPage;
