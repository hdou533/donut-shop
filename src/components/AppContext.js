'use client'

import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";


export const CartContext = createContext({})

const AppProvider = ({ children }) => {
    const [cartProducts, setCartProducts] = useState([])

    const localStorage = typeof window != 'undefined' ? window.localStorage : null

    useEffect(() => {
        if (localStorage && localStorage.getItem('cart')) {
           setCartProducts(JSON.parse(localStorage.getItem('cart')))
       }
    }, [])
    
    const saveToLocalStorage = () => {
        if (localStorage) {
            localStorage.setItem('cart', JSON.stringify(cartProducts))
        }
    }

    const addToCart = (product) => {
        setCartProducts(prevProduct => {
            const newProducts = [...prevProduct, product]
            saveToLocalStorage(newProducts)
            return newProducts
        })
    }

    return ( 
        <SessionProvider>
            <CartContext.Provider value={{cartProducts, setCartProducts,addToCart}} >
                {children}
            </CartContext.Provider>
            
        </SessionProvider>
     );
}
 
export default AppProvider;
