import { useRouter } from "next/router";
import { Book } from "@/typings";
import { useEffect, useState } from "react";
import { FETCH_BY_ID_URL } from "@/requests";
import axios from "axios";
import ContentLayout from "@/components/ContentLayout";
import Image from "next/image";

import { AiOutlineStar } from "react-icons/ai";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BiMicrophone } from "react-icons/bi";
import { BsBook, BsBookmark, BsFillBookmarkFill } from "react-icons/bs";
import { HiOutlineLightBulb } from "react-icons/hi";
import { VscBook } from "react-icons/vsc";
import { useRecoilState } from "recoil";
import { authAtom } from "@/atoms/authAtom";
import { authModalOpenAtom } from "@/atoms/authModalAtom";

export default function Book() {
  const [user, setUser] = useRecoilState(authAtom);
  const [showAuthModal, setShowAuthModal] = useRecoilState(authModalOpenAtom);
  const handleOpen = () => {
    setShowAuthModal(true);
  };

  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState<Book | undefined>();
  const [loading, setLoading] = useState(false);

  const getBook = async () => {
    setLoading(true);
    const { data } = await axios.get(`${FETCH_BY_ID_URL + id}`);
    setBook(data);
    setLoading(false);
  };
  //ID does't load immediately, have to wait to fetch
  useEffect(() => {
    id && getBook();
  }, [id]);

  //!must finish before running
  //? I need help with this
  //todo: this is not done yet
  // Just kidding, this is all test comments
  // *
  const handleReadOrListen = () => {
    if (!user) {
      handleOpen();
    }
    else {
      // if (subscriptionStatus )
    }
  }

  //if in library, show filled bookmark
  const addToLibrary = () => {};

  return (
    <ContentLayout className="flex">
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="mt-6 flex flex-col-reverse items-center md:items-start lg:flex-row">
          {/* DESCRIPTION */}
          <div>
            <div className="mb-4 flex flex-col border-b-[1px]">
              <span className="mb-3 text-[24px] font-semibold text-[#032b41] ">
                {book?.title}
              </span>
              <span className="mb-3 font-semibold text-[#032b41] ">
                {book?.author}
              </span>
              <span className="mb-3 text-lg font-light text-[#032b41]">
                {book?.subTitle}
              </span>
            </div>
            <div className="mb-4 border-b-[1px]">
              <div className="mb-4 flex">
                <div className="flex w-1/2 items-center text-[#032b41]">
                  <AiOutlineStar className="book__feature--icon" />
                  <div className="book__feature">
                    {book?.averageRating}&nbsp;({book?.totalRating} ratings)
                  </div>
                </div>
                <div className="book__feature--container">
                  <AiOutlineClockCircle className="book__feature--icon" />
                  <div className="book__feature">03:24</div>
                </div>
              </div>
              <div className="mb-4 flex">
                <div className="book__feature--container">
                  <BiMicrophone className="book__feature--icon" />
                  <div className="book__feature">Audio & Text</div>
                </div>
                <div className="book__feature--container">
                  <HiOutlineLightBulb className="book__feature--icon" />
                  <div className="book__feature">8 Key Ideas</div>
                </div>
              </div>
            </div>
            <div className="mb-6 flex justify-start gap-x-4">
              <button className="book__button" onClick={handleReadOrListen}>
                <VscBook className="text-2xl" /> Read
              </button>
              <button className="book__button" onClick={handleReadOrListen}>
                <BiMicrophone className="text-2xl" /> Listen
              </button>
            </div>
            <div className="mb-8 flex cursor-pointer items-center text-[#0365f2] hover:text-[#044298]">
              <BsBookmark className="mr-2 text-2xl" />
              <div className="text-[14px] font-semibold">
                Add Title to My Library
              </div>
            </div>
            <div>
              <div className="book__description--header">What&apos;s it about?</div>
              <div className="mb-4 flex gap-x-6">
                <div className="book__description--tag">{book?.tags[0]}</div>
                <div className="book__description--tag">{book?.tags[1]}</div>
              </div>
              <p className="text-[#032b41]">{book?.bookDescription}</p>
            </div>
            <div>
              <div className="book__description--header">About the Author</div>
              <p className="text-[#032b41]">{book?.authorDescription}</p>
            </div>
          </div>
          {book && (
            <Image
              src={`${book?.imageLink}`}
              width={300}
              height={300}
              alt="book image"
              className="mb-8"
            />
          )}
        </div>
      )}
    </ContentLayout>
  );
}
