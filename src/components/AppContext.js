'use client'

import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";



export const CartContext = createContext({})
export const cartProductPrice = (cartProduct) => {
    let price = cartProduct.price
    // space for different size and options
    //
    //
    return price
}


const AppProvider = ({ children }) => {
    const [cartProducts, setCartProducts] = useState([])

    const localStorage = typeof window != 'undefined' ? window.localStorage : null

    useEffect(() => {
        if (localStorage && localStorage.getItem('cart')) {
           setCartProducts(JSON.parse(localStorage.getItem('cart')))
       }
    }, [])
    
    const saveToLocalStorage = (cartProducts) => {
        if (localStorage) {
            localStorage.setItem('cart', JSON.stringify(cartProducts))
        }
    }

    const addToCart = (product) => {
        setCartProducts(prevProduct => {
            const newProducts = [...prevProduct, product]
            console.log(newProducts)
            saveToLocalStorage(newProducts)
            return newProducts
        })
       
    }

    const removeCartProduct = (indexToDelete) => {
        console.log(indexToDelete)
        setCartProducts(prevCartProducts => {
            const newCartProducts = prevCartProducts.filter((prev, index) => index !== indexToDelete)
            console.log(newCartProducts)
            saveToLocalStorage(newCartProducts)
            return newCartProducts
        })
        
    }

    const clearCart = () => {
        setCartProducts([]);
        saveToLocalStorage([]);
      }

    return ( 
        <SessionProvider>
            <CartContext.Provider value={{cartProducts, setCartProducts,addToCart, removeCartProduct, clearCart}} >
                {children}
            </CartContext.Provider>
            
        </SessionProvider>
     );
}
 
export default AppProvider;
