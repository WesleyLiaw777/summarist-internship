import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
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

import requests from "@/requests";
import axios from "axios";
import { Book } from "@/typings";

interface Props {
  selected: Book;
  recommended: Book[];
  suggested: Book[];
}

export default function ForYou({ selected, recommended, suggested }: Props) {
  console.log(selected, recommended, suggested)
  const router = useRouter();
  const handleSignout = () => {
    signOut(auth);
    router.push("/");
  };

  const fetchBooks = async () => {
    const data = axios.get("");
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      {/* PAGE */}
      <div className="flex">
        {/* SIDEBAR */}
        <div className="flex h-screen w-[200px] flex-col bg-[#f7faf9]">
          <Image
            src="/logo.png"
            width={300}
            height={300}
            alt="logo"
            className="p-4"
          />

          <div className="mb-5 mt-10 flex flex-grow flex-col justify-between">
            {/* PAGE LINKS */}
            <ul>
              <li className="sidebar__link cursor-pointer">
                <AiOutlineHome className="mr-3 text-2xl" />
                <span>Home</span>
              </li>
              <li className="sidebar__link cursor-pointer">
                <BsBookmarks className="mr-3 text-2xl" />
                <span>My Libary</span>
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
              <li className="sidebar__link">
                <GoGear className="mr-3 text-2xl" />
                <span>Settings</span>
              </li>
              <li className="sidebar__link">
                <AiOutlineQuestionCircle className="mr-3 text-2xl" />
                <span>Help & Support</span>
              </li>
              <li className="sidebar__link">
                <FiLogOut className="mr-3 text-2xl" />
                <span>LOGOUT</span>
              </li>
            </ul>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex w-[calc(100vw-200px)] flex-col">
          <div className="h-[80px] border-b-2 border-[#e1e7ea]">
            <div className="margin-auto flex w-full max-w-[1070px] flex-col">
              <div className="justify flex h-[80px] items-center justify-end ">
                {/* SEARCH BAR */}
                <div className="relative mr-8 flex w-full max-w-[340px] bg-[#f1f6f4]">
                  <input
                    className="h-[40px] w-full rounded-md border-2 bg-[#f1f6f4] p-3 text-sm text-[#042330] placeholder-gray-500 outline-none"
                    type="text"
                    placeholder="Search for books..."
                  />
                  <div className="absolute right-[4px] flex h-[40px] items-center border-l-2 border-[#e1e7ea]">
                    <div className="pl-2 pr-1">
                      <AiOutlineSearch className="text-2xl" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MAIN SECTION */}
          <div className="my-10 flex flex-col gap-y-3 p-6">
            <section className="">
              <h3 className="foryou__section--title">Selected just for you</h3>
              <Link href={"/book"} className="selected__book">
                <div className="w-[40%] text-[#032b41]">
                  How Constant Innovation Creates Radically Successful
                  Businesses
                </div>
                <div className="w-[1px] bg-[#bac8ce]"></div>
                <div>
                  {/* IMAGE */}
                  <div>
                    <h3>The Lean Startup</h3>
                    <h4>Eric Ries</h4>
                    <div>3 mins 23 secs</div>
                  </div>
                </div>
              </Link>
            </section>
            <section>
              <h3 className="foryou__section--title">Recommended for you</h3>
              <span className="foryou__section--subtitle">
                We think you'll like these
              </span>
            </section>
            <section>
              <h3 className="foryou__section--title">Suggested books</h3>
            </section>
            <span className="foryou__section--subtitle">
              Check out what others have been reading
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async () => {
  try {
    const [selected, recommended, suggested] = await axios.all([
      `${requests.fetchSelected}`,
      `${requests.fetchRecommended}`,
      `${requests.fetchSuggested}`,
    ]);
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
