import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/router";

import { AiOutlineHome } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BsBookmarks } from "react-icons/bs";
import { BsFillPenFill } from "react-icons/bs";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { RiBallPenLine } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { GoGear } from "react-icons/go";

interface Book {
  id: string;
  author: string;
  title: string;
  subTitle: string;
  imageLink: string;
  audioLink: string;
  totalRating: number;
  averageRating: number;
  keyIdeas: number;
  type: string;
  status: string;
  subscriptionRequired: boolean;
  summary: string;
  tags: string[];
  bookDescription: string;
  authorDescription: string;
}

export default function ForYou() {
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
        <div className="flex h-screen flex-col bg-[#f7faf9]">
          <Image
            src="/logo.png"
            width={200}
            height={200}
            alt="logo"
            className="p-6"
          />

          <div className="mb-5 mt-10 flex flex-grow flex-col justify-between">
            {/* PAGE LINKS */}
            <ul>
              <li className="sidebar__link">
                <AiOutlineHome className="mr-3 text-2xl" />
                <span>Home</span>
              </li>
              <li className="sidebar__link">
                <BsBookmarks className="mr-3 text-2xl" />
                <span>My Libary</span>
              </li>
              <li className="sidebar__link">
                <BsFillPenFill className="mr-3 text-2xl" />
                <span>Highlights</span>
              </li>
              <li className="sidebar__link">
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
        <div className="margin-auto flex w-screen max-w-[1070px] flex-col">
          <div className="flex h-[80px] w-screen items-center border-b-2 border-[#e1e7ea]">
            <div className="max-width-[340px] relative flex bg-[#f1f6f4]">
              <input
                className="h-[40px] w-full rounded-md bg-[#f1f6f4]"
                type="text"
                placeholder="Search for books:"
              />
              <div className="absolute bottom-1/4 right-[4px] flex h-fit border-l-2 border-[#e1e7ea]">
                <AiOutlineSearch />
              </div>
            </div>
          </div>
          <div>MAIN SECTION</div>
        </div>
      </div>
    </>
  );
}