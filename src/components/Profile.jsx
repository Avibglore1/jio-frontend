"use client"
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import NextLink from 'next/link';
import React, { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ChevronDown, ExternalLink } from 'lucide-react';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userLoggedOutDetails } from '@/redux/userSlice';

function Profile() {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const userData = useSelector((state) => state.user);
    const router = useRouter();
     
     const handleAuthAction = () => {
        setOpen(false); // Close the sheet
        if (userData.isLoggedIn) {
            dispatch(userLoggedOutDetails()); // Dispatch logout action
            router.push("/"); // Redirect to home after logout
        } else {
            router.push("/login"); // Navigate to login
        }
    };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button className="w-8 h-8 rounded-full flex items-center justify-center">
              <Image src="/user.jpg" alt="User" className="w-8 h-8 rounded-full" height={20} width={20} />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-black text-white w-80">
            <SheetTitle className="sr-only">User Profile</SheetTitle> {/* Hidden for accessibility */}
            
            {/* Profile Section */}
            <div className="flex flex-col items-center p-5 border-b border-gray-700">
              <Image src="/user.jpg" alt="User" className="w-20 h-20 rounded-full" height={80} width={80} />
              <h3 className="mt-3 text-xl font-semibold">{userData.isLoggedIn ? userData.user.name : "Guest"}</h3>
              <Button className="mt-3 bg-pink-600 text-white px-6 rounded-full hover:bg-pink-500"
                onClick={handleAuthAction}>
                {userData.isLoggedIn ? "Logout" : "Login"}
              </Button>
            </div>

            {/* Menu Items */}
            <div className="mt-4 text-gray-300">
              <ul className="space-y-4">
                {[
                { name: "Subscribe Now", path: "/subscription"},  
                { name: "Home", path: "/" },
                { name: "Movies", path: "/movies" },
                { name: "Tv Shows", path: "/tv-shows" },
                { name: "Watchlist", path: "/watchlist" },
                { name: "Jio+", path: "/jio-plus" },
              ].map((item) => (
                <li key={item.path}>
                  <NextLink 
                    href={item.path}
                    className="flex justify-between items-center px-4 py-2 hover:bg-gray-800 cursor-pointer w-full"
                    onClick={() => setOpen(false)} // Close the sheet when clicked
                  >
                    {item.name} <ExternalLink className="w-4 h-4" />
                  </NextLink>
                </li>
                ))}
                <li className="flex justify-between items-center px-4 py-2 hover:bg-gray-800 cursor-pointer">
                  Help and Legal <ChevronDown className="w-4 h-4" />
                </li>
              </ul>
            </div>
          </SheetContent>
     </Sheet>
  )
}

export default Profile