import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BsBookmarks } from "react-icons/bs";
import { BsFillPenFill } from "react-icons/bs";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { RiBallPenLine } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { GoGear } from "react-icons/go";

import axios from "axios";
import { Book } from "@/typings";
import requests from "@/requests";
import BookSlider from "@/components/BookSlider";

interface Props {
  selected: Book;
  recommended: Book[];
  suggested: Book[];
}

export const getServerSideProps = async () => {
  try {
    //concurrently fetch for improved performance
    let [selected, recommended, suggested] = await axios
      .all(requests.map((url) => axios.get(url)))
      .then((results) => results.map((response) => response.data));

    //selected is returned as an array with only 1 object. simplified.
    selected = selected[0];
    return {
      props: {
        selected,
        recommended,
        suggested,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        selected: null,
        recommended: [],
        suggested: [],
      },
    };
  }
};

export default function ForYou({ selected, recommended, suggested }: Props) {
  const router = useRouter();
  const handleSignout = () => {
    signOut(auth);
    router.push("/");
  };

  return (
    <>
      {/* PAGE */}
      <div className="flex">
        {/* SIDEBAR */}
        <div className="fixed hidden h-screen w-[200px] flex-col bg-[#f7faf9] md:flex">
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
              <li className="cursor-pointer">
                <Link className="sidebar__link" href="/for-you">
                  <AiOutlineHome className="mr-3 text-2xl" />
                  <span>Home</span>
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link href="/library" className="sidebar__link">
                  <BsBookmarks className="mr-3 text-2xl" />
                  <span>My Libary</span>
                </Link>
              </li>
              <li className="sidebar__link cursor-not-allowed">
                <BsFillPenFill className="mr-3 text-2xl" />
                <span>Highlights</span>
              </li>
              <li className="sidebar__link cursor-not-allowed">
                <AiOutlineSearch className="mr-3 text-2xl" />
                <span>Search</span>
              </li>
            </ul>

            {/* ACCOUNT LINKS */}
            <ul>
              <li className="cursor-pointer">
                <Link href="/settings" className="sidebar__link">
                  <GoGear className="mr-3 text-2xl" />
                  <span>Settings</span>
                </Link>
              </li>
              <li className="sidebar__link cursor-not-allowed">
                <AiOutlineQuestionCircle className="mr-3 text-2xl" />
                <span>Help & Support</span>
              </li>
              <li className="sidebar__link cursor-pointer">
                <FiLogOut className="mr-3 text-2xl" />
                <span>LOGOUT</span>
              </li>
            </ul>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-1 justify-center px-8 md:ml-[200px] 2xl:ml-0">
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
            <div className="mt-10 flex max-w-[1070px] flex-col gap-y-3 pb-[80px]">
              {/* SELECTED BOOK */}
              <section>
                <h3 className="foryou__section--title">
                  Selected just for you
                </h3>
                <Link
                  href={"/book"}
                  className="mb-6 flex w-full max-w-[680px] flex-col justify-between gap-6 rounded bg-[#fbefd6] p-6 text-[#032b41] md:flex-row md:px-10 md:py-6"
                >
                  <div className="w-full text-left md:w-[30%]">
                    {selected?.subTitle}
                  </div>
                  <div className="hidden h-[140px] w-[1px] bg-[#bac8ce] md:flex"></div>
                  <div className="flex">
                    <Image
                      src={`${selected.imageLink}`}
                      width={140}
                      height={140}
                      alt="selected book image"
                      className="mr-4"
                    />
                    <div className="flex flex-col gap-y-1 text-left">
                      <h3 className="font-semibold">{selected?.title}</h3>
                      <h4>{selected?.author}</h4>
                      <div>3 mins 23 secs</div>
                    </div>
                  </div>
                </Link>
              </section>

              {/* RECOMMENDED */}
              <section>
                <h3 className="foryou__section--title">Recommended for you</h3>
                <span className="foryou__section--subtitle">
                  We think you'll like these
                </span>
                <BookSlider books={recommended} />
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
