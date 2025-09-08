"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { CartContext } from "../AppContext";
import ShoppingCart from "../icons/ShoppingCart";
import BurgerMenu from "./BurgerMenu";
import { UserIcon } from "../icons/User";

const Header = () => {
  const session = useSession();

  const userData = session.data?.user;
  const avatar = userData?.image;
  const router = useRouter();
  const cartContext = useContext(CartContext);
  const cartProducts = cartContext?.cartProducts;

  let userName = userData?.name || userData?.email;
  if (userName && userName.includes(" ")) {
    userName = userName.split(" ")[0];
  }

  return (
    <>
      <header className="flex items-center justify-between py-4">
        <div className="sm:hidden">
          <BurgerMenu />
        </div>
        <div className="flex gap-8">
          <Link
            href={"/"}
            className="text-primary text-2xl font-semibold flex flex-col"
          >
            <span>CrispyCrown</span>
          </Link>

          <nav className="hidden sm:flex gap-8 items-center font-semibold text-gray-500">
            <Link href={"/"}>Home</Link>
            <Link href={"/menu"}>Menu</Link>
            <Link href={"/#about"}>About</Link>
            <Link href={"/#contact"}>Contact</Link>
          </nav>
        </div>

        <div className="flex gap-2 items-center font-semibold">
          <Link href={"/profile"}>
            <UserIcon />
          </Link>

          {/* <div className='hidden sm:flex items-center gap-2'>
                    {session.data && (
                        <>
                            <>
                                <Image src={avatar} alt='avatar' width={24} height={24} className='rounded-full' />
                                <Link href={'/profile'} className='whitespace-nowrap text-gray-700'>Hi, {userName}</Link>
                            </>
                            
                            <button
                                onClick={() => {
                                    signOut()
                                    router.push('/')
                                }} className='bg-primary text-white rounded-full px-4 py-2'>Logout</button>
                        </>
                        
                    )}
                    {!session.data && (
                        <>
                            <Link href={'/login'} className='text-gray-500'>Login</Link>
                            <Link href={'/register'} className='bg-primary text-white rounded-full px-4 py-2'>Register</Link>
                        
                        </>    
                    )}
                    </div> */}

          {/* {cartProducts?.length > 0 && ( */}
          <Link href={"/cart"} className="relative">
            <ShoppingCart />
            {cartProducts && (
              <span className="absolute -top-2 -right-2 w-5 h-5 flex justify-center items-center text-sm rounded-full bg-primary text-white">
                {cartProducts.length}
              </span>
            )}
          </Link>
          {/* )} */}
        </div>
      </header>
    </>
  );
};

export default Header;
