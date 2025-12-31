import Image from "next/image";
import { useContext } from "react";
import type { CartProduct } from "@/types/cartProduct";
import toast from "react-hot-toast";
import type { MenuItem as MenuItemType } from "@/types/menuItem";
import { CartContext } from "../AppContext";
import { CartContextType } from "@/types/context";

const MenuItem = (menuItem: MenuItemType) => {
  const cartContext = useContext(CartContext) as CartContextType | undefined;
  const addToCart = cartContext?.addToCart;
  const { image, name, description, price, _id } = menuItem;

  return (
    <div className="bg-pink-100 p-8 rounded-lg text-center flex flex-col justify-start items-center gap-4 over hover:bg-red-100 hover:shadow-xl hover:shadow-black/20 transition-all">
      <div className="relative w-full h-[200px]">
        {image && (
          <Image
            src={image}
            fill
            alt="donut"
            className="rounded-lg"
            style={{ objectFit: "cover" }}
          />
        )}
      </div>
      <div className="w-full">
        <h4 className="text-primary font-semibold text-xl">{name}</h4>
        <p className="my-2 text-gray-500 w-full h-12 overflow-y-scroll overscroll-contain no-scrollbar">
          {description}
        </p>
        <p className="italic text-md">
          <span className="font-semibold">${price}</span> Per Dozen{" "}
        </p>
      </div>

      <button
        className=" bg-primary rounded-full text-white px-6 py-2 hover:-translate-y-0.5"
        onClick={() => {
          if (addToCart) {
            addToCart({ _id, name, image, price, quantity: 1 } as CartProduct);
            toast.success("Added to cart");
          }
        }}
      >
        Add to cart
      </button>
    </div>
  );
};

export default MenuItem;
