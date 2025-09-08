"use client";

import { SessionProvider } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import { CartContextType } from "../types/context";
import { CartProduct } from "../types/cartProduct";

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);
export const cartProductPrice = (cartProduct: CartProduct) => {
  let price = cartProduct.price;
  // space for different size and options
  //
  //
  return price;
};

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  const localStorage =
    typeof window != "undefined" ? window.localStorage : null;

  useEffect(() => {
    if (localStorage) {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCartProducts(JSON.parse(storedCart));
      }
    }
  }, []);

  const saveToLocalStorage = (cartProducts: CartProduct[]) => {
    if (localStorage) {
      localStorage.setItem("cart", JSON.stringify(cartProducts));
    }
  };

  const addToCart = (product: CartProduct) => {
    setCartProducts((prevProduct) => {
      const newProducts = [...prevProduct, product];

      saveToLocalStorage(newProducts);
      return newProducts;
    });
  };

  const removeCartProduct = (indexToDelete: number) => {
    setCartProducts((prevCartProducts) => {
      const newCartProducts = prevCartProducts.filter(
        (prev, index) => index !== indexToDelete
      );

      saveToLocalStorage(newCartProducts);
      return newCartProducts;
    });
  };

  const clearCart = () => {
    setCartProducts([]);
    saveToLocalStorage([]);
  };

  return (
    <SessionProvider>
      <CartContext.Provider
        value={{
          cartProducts,
          setCartProducts,
          addToCart,
          removeCartProduct,
          clearCart,
        }}
      >
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
};

export default AppProvider;
