import React, { useState } from "react";

import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BsBookmarks } from "react-icons/bs";
import { BsPen } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { GoGear } from "react-icons/go";
import { authAtom } from "@/atoms/authAtom";
import { useRecoilState } from "recoil";
import { authModalOpenAtom } from "@/atoms/authModalAtom";

export default function ContentLayout({ children }: any) {
  const [user, setUser] = useRecoilState(authAtom);
  const [showAuthModal, setShowAuthModal] = useRecoilState(authModalOpenAtom);
  const handleOpen = () => {
    setShowAuthModal(true);
  };
  const handleLogout = () => {
    signOut(auth);
  };
  console.log(user);

  let currentPath;
  let currentPage;
  if (typeof window !== "undefined") {
    currentPath = window.location.pathname;
    currentPage = currentPath.substring(currentPath.lastIndexOf("/") + 1);
  }

  return (
    <>
      {/* PAGE */}
      <div className="flex">
        {/* SIDEBAR */}
        <div className="ease fixed h-screen w-[200px] translate-x-[-200px] flex-col bg-[#f7faf9] transition duration-300 md:flex md:translate-x-0">
          <Image
            src="/logo.png"
            width={300}
            height={300}
            alt="logo"
            className="p-5"
          />
          <div className="mb-5 mt-10 flex flex-grow flex-col justify-between">
            {/* PAGE LINKS */}
            <ul>
              <li className="relative cursor-pointer">
                {currentPage === "for-you" && (
                  <div className="sidebar__highlight"></div>
                )}
                <Link className="sidebar__link" href="/for-you">
                  <AiOutlineHome className="mr-3 text-2xl" />
                  <span>Home</span>
                </Link>
              </li>
              <li className="relative cursor-pointer">
                {currentPage === "library" && (
                  <div className="sidebar__highlight"></div>
                )}
                <Link href="/library" className="sidebar__link">
                  <BsBookmarks className="mr-3 text-2xl" />
                  <span>My Libary</span>
                </Link>
              </li>
              <li className="sidebar__link cursor-not-allowed">
                <BsPen className="mr-3 text-2xl" />
                <span>Highlights</span>
              </li>
              <li className="sidebar__link cursor-not-allowed">
                <AiOutlineSearch className="mr-3 text-2xl" />
                <span>Search</span>
              </li>
            </ul>

            {/* ACCOUNT LINKS */}
            <ul>
              <li className="relative cursor-pointer">
                {currentPage === "settings" && (
                  <div className="sidebar__highlight"></div>
                )}
                <Link href="/settings" className="sidebar__link">
                  <GoGear className="mr-3 text-2xl" />
                  <span>Settings</span>
                </Link>
              </li>
              <li className="sidebar__link cursor-not-allowed">
                <AiOutlineQuestionCircle className="mr-3 text-2xl" />
                <span>Help & Support</span>
              </li>
              {user ? (
                <li
                  onClick={handleLogout}
                  className="sidebar__link cursor-pointer"
                >
                  <FiLogOut className="mr-3 text-2xl" />
                  <span>Logout</span>
                </li>
              ) : (
                <li
                  // OPEN MODAL
                  onClick={handleOpen}
                  className="sidebar__link cursor-pointer"
                >
                  <FiLogOut className="mr-3 text-2xl" />
                  <span>Login</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="ease relative flex w-full flex-1 translate-x-0 justify-center pl-6 pr-10 transition duration-300 md:mr-[200px] md:w-[calc(100vw-200px)] md:translate-x-[200px] 2xl:ml-0">
          <hr className="absolute right-0 top-[100px] w-full" />

          {/* RIGHT PAGE */}
          <div className="flex w-full max-w-[1070px] flex-col items-center">
            {/* TOP */}
            <div className="relative flex h-[80px] w-full items-center justify-end">
              <input
                className="mx-4 h-[40px] w-full max-w-[340px] rounded-md border-2 bg-[#f1f6f4] p-3 text-sm text-[#042330] placeholder-gray-500 outline-none"
                type="text"
                placeholder="Search for books..."
              />
              <div className="absolute right-[24px] flex h-[40px] items-center border-l-2 border-[#e1e7ea]">
                <div className="pl-2 pr-1">
                  <AiOutlineSearch className="text-2xl" />
                </div>
              </div>
            </div>
            {/* CONTENT SECTION */}
            <div className="mt-10 flex w-full max-w-[1070px] flex-col gap-y-3 pb-[60px]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
