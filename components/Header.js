import React, { useContext, useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import CartContext from "../components/CartContext";
import useOnClickOutside from "./useOnClickOutside";

const Header = () => {
  const { cart } = useContext(CartContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setModalOpen(false));

  useEffect(() => {
    const handleClick = (e) => {
      if (isModalOpen && e.target.closest("a") !== null) {
        setModalOpen(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isModalOpen]);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);


  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 text-white shadow-md bg-rose-950">
      <div className="flex items-center">
        {/* Logo */}
        <Link href="/" legacyBehavior>
          <a className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Logo" width={60} height={60} />
            <span className="text-lg font-bold">Mana Arts</span>
          </a>
        </Link>
      </div>
      <nav className="hidden md:flex items-center space-x-8">
        {/* Cart Icon */}
        <Link href="/cart" legacyBehavior>
          <a className="p-2 text-gray-300 rounded-full hover:bg-gray-800 relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 18h9"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 8h9"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8h3l2.25 8h11.51l2.24-8h3"
              />
              <circle cx={9} cy={21} r={1} />
              <circle cx={18} cy={21} r={1} />
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </a>
        </Link>
      </nav>
      <div className="md:hidden">
        {isModalOpen ? (
          <div
            ref={ref}
            className="bg-rose-950 fixed right-0 top-0 h-screen transition translate-x-[-1px] rounded-lg text-white w-full md:w-[24rem]"
          >
            <button
              onClick={() => setModalOpen(!isModalOpen)}
              className="-mr-2 float-right mb-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                stroke="currentColor"
                aria-hidden="true"
                className="h-6 w-6"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                 
                  d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
      
              <div className="mt-8 relative">
                <nav className="grid gap-y-8">
                  <Link href="/cart" legacyBehavior>
                    <a className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-800">
                      <h1 className="my-3 ml-3 text-3xl font-bold">
                        Cart ({cartItemCount})
                      </h1>
                    </a>
                  </Link>
                </nav>
              </div>
            </div>
          ) : (
            <button onClick={() => setModalOpen(!isModalOpen)} className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="white"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>
          )}
        </div>
      </header>
    );
  };
  
  export default Header;      