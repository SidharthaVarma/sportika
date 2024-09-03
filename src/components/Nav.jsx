

// const Navigation = () => {
//   const navigate = useNavigate();

//   const handleNavigation = (e) => {
//     if (e.target.id === 'SignUp') {
//       navigate('/signup');
//     } else if (e.target.id === 'LogIn') {
//       navigate('/login');
//     }
//   };

//   return (
//     <div>
//       <nav className="flex items-center justify-between font-title h-20 px-4 mb-[0.3125rem]">
//         <img 
//           className="h-20 w-auto m-1 relative top-1" 
//           src="src/assets/logo.png" 
//           alt="gitamLogo" 
//         />
//         <div className="flex space-x-4">
//           <button
//             className="bg-customGreen h-10 w-20 rounded-lg text-customWhite hover:bg-customHover font-medium"
//             id="SignUp"
//             onClick={handleNavigation}
//           >
//             Sign up
//           </button>
//           <button
//             className="bg-white h-10 w-20 rounded-lg border border-slate-300 hover:text-customWhite hover:bg-customGreen font-medium text-stone-950"
//             id="LogIn"
//             onClick={handleNavigation}
//           >
//             Log in
//           </button>
//         </div>
//       </nav>

//       {/* Upper div for larger screens */}
//       <div className="hidden md:flex items-center justify-between font-title h-10 px-4 bg-customGreen ">
//         <ul className="flex flex-wrap justify-between w-full">
//           <li className="font-medium text-customWhite text-base hover:cursor-pointer ">
//             Home
//           </li>
//           <li className="font-medium text-customWhite text-base hover:cursor-pointer ">
//             About Us
//           </li>
//           <li className="font-medium text-customWhite text-base hover:cursor-pointer ">
//             FAQs
//           </li>
//           <li className="font-medium text-customWhite text-base hover:cursor-pointer">
//             Changemaker
//           </li>
//           <li className="font-medium text-customWhite text-base hover:cursor-pointer ">
//             Campus Connect
//           </li>
//           <li className="font-medium text-customWhite text-base hover:cursor-pointer ">
//             Library
//           </li>
//           <li className="font-medium text-customWhite text-base hover:cursor-pointer ">
//             My-GITAM
//           </li>
//           <li className="font-medium text-customWhite text-base hover:cursor-pointer ">
//             Parents's Login
//           </li>
//           <li className="font-medium text-customWhite text-base hover:cursor-pointer ">
//             Payments
//           </li>
//           <li className="font-medium text-customWhite text-base hover:cursor-pointer ">
//             Media
//           </li>
//           <li className="font-medium text-customWhite text-base hover:cursor-pointer ">
//             Alumni
//           </li>
//         </ul>
//       </div>
//     </div>
//   );
// };

"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Link from 'next/link';

const Navigation = () => {
  const router = useRouter();

  const handleNavigation = (e) => {
    if (e.target.id === "SignUp") {
      router.push("/signup"); // Route to signup page
    } else if (e.target.id === "LogIn") {
      router.push("/login"); // Route to login page
    }
  };

  return (
    <div>
      {/* Fixed top navigation bar */}
      <nav className="fixed top-0 left-0 right-0 flex items-center justify-between font-title h-20 px-4 bg-white shadow-md z-50">
        <img
          className="h-20 w-auto"
          src="/assets/logo.png"
          alt="gitamLogo"
        />
        <div className="flex space-x-4">
          <button
            className="bg-customGreen h-10 w-20 rounded-lg text-customWhite hover:bg-customHover font-medium"
            id="SignUp"
            onClick={handleNavigation}
          >
            Sign up
          </button>
          <button
            className="bg-white h-10 w-20 rounded-lg border border-slate-300 hover:text-customWhite hover:bg-customGreen font-medium text-stone-950"
            id="LogIn"
            onClick={handleNavigation}
          >
            Log in
          </button>
        </div>
      </nav>

{/* Spacing to prevent content overlap with fixed nav */}
<div className="mt-20"></div>

{/* Upper div for larger screens */}
{/* Lower navbar */}
<div className="hidden md:flex items-center justify-between font-title h-10 px-4 bg-customGreen sticky top-20 z-50">
  <ul className="flex flex-wrap justify-between w-full">
    <li className="font-medium text-customWhite text-base hover:cursor-pointer">
      <a href="#home">Home</a>
    </li>
    <li className="font-medium text-customWhite text-base hover:cursor-pointer">
      <a href="#about-us">About Us</a>
    </li>
    <li className="font-medium text-customWhite text-base hover:cursor-pointer">
      <a href="#faqs">FAQs</a>
    </li>
    <li className="font-medium text-customWhite text-base hover:cursor-pointer">
    <Link href="/events">
        Events
      </Link>
    </li>
    <li className="font-medium text-customWhite text-base hover:cursor-pointer">
      <a href="#campus-connect">Campus Connect</a>
    </li>
    <li className="font-medium text-customWhite text-base hover:cursor-pointer">
      <a href="#library">Library</a>
    </li>
    <li className="font-medium text-customWhite text-base hover:cursor-pointer">
      <a href="#my-gitam">My-GITAM</a>
    </li>
    <li className="font-medium text-customWhite text-base hover:cursor-pointer">
      <a href="#parents-login">Parents's Login</a>
    </li>
    <li className="font-medium text-customWhite text-base hover:cursor-pointer">
      <a href="#payments">Payments</a>
    </li>
    <li className="font-medium text-customWhite text-base hover:cursor-pointer">
      <a href="#media">Media</a>
    </li>
    <li className="font-medium text-customWhite text-base hover:cursor-pointer">
      <a href="#alumni">Alumni</a>
    </li>
  </ul>
</div>

    </div>
  );
};

export default Navigation;
