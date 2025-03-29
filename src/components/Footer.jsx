import { FaFacebookF, FaXTwitter, FaInstagram, FaYoutube } from "react-icons/fa6";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-6 lg:px-16 flex flex-wrap justify-between gap-6">
        {/* JioCinema Section */}
        <div className="flex-1 min-w-[200px]">
          <h2 className="font-bold text-lg">JIOCINEMA</h2>
          <ul className="mt-3 space-y-2 text-gray-400">
            <li>For You</li>
            <li>Sports</li>
            <li>Movies</li>
            <li>TV Shows</li>
          </ul>
        </div>

        {/* Support Section */}
        <div className="flex-1 min-w-[200px]">
          <h2 className="font-bold text-lg">SUPPORT</h2>
          <ul className="mt-3 space-y-2 text-gray-400">
            <li>Help Center</li>
            <li>Terms Of Use</li>
            <li>Privacy Policy</li>
            <li>Content Complaints</li>
          </ul>
        </div>

        {/* Connect With Us */}
        <div className="flex-1 min-w-[200px]">
          <h2 className="font-bold text-lg">CONNECT WITH US</h2>
          <div className="mt-3 flex space-x-3">
            <FaFacebookF className="w-8 h-8 p-2 bg-gray-700 rounded-full cursor-pointer" />
            <FaXTwitter className="w-8 h-8 p-2 bg-gray-700 rounded-full cursor-pointer" />
            <FaInstagram className="w-8 h-8 p-2 bg-gray-700 rounded-full cursor-pointer" />
            <FaYoutube className="w-8 h-8 p-2 bg-gray-700 rounded-full cursor-pointer" />
          </div>
        </div>

        {/* Download the App */}
        <div className="flex-1 min-w-[200px]">
          <h2 className="font-bold text-lg">DOWNLOAD THE APP</h2>
          <div className="mt-3 flex space-x-3">
            <Image
              src="/googleplaystore.jpg"
              width={150}
              height={50}
              alt="Google Play"
              className="cursor-pointer"
            />
            <Image
              src="/iosappstore.jpg"
              width={150}
              height={50}
              alt="App Store"
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-400 text-sm mt-8 border-t border-gray-700 pt-4">
        Copyright © 2024 Viacom18 Media PVT LTD. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
