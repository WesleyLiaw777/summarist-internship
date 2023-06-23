import { Book } from "@/typings";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineClockCircle } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";

interface BookSliderProps {
  books: Book[];
}

export default function BookSlider({ books }: BookSliderProps) {
  return (
    <div className="mt-4 flex w-full snap-x gap-x-6 overflow-x-auto">
      {books?.map((book) => (
        <Link href={`/book/${book.id}`} key={book.id}>
          <div className="relative flex h-full w-[200px] snap-start flex-col gap-y-2 rounded px-5 pb-4 pt-8 hover:bg-[#f1f6f4]">
            <Image
              src={`${book.imageLink}`}
              width={172}
              height={172}
              alt="book image"
            />
            {book.subscriptionRequired && (
              <div className="absolute right-2 top-2 flex h-[18px] items-center rounded-[20px] bg-[#032b41] px-2 text-[10px] text-white">
                Premium
              </div>
            )}
            <span className="font-bold leading-[18px] text-[#032b41]">
              {book.title}
            </span>
            <span className="text-sm font-light text-[#6b757b]">
              {book.author}
            </span>
            <span className="text-sm text-[#394547]">{book.subTitle}</span>
            <div className="flex gap-x-2">
              <div className="flex items-center gap-x-1 text-[14px] font-light text-[#6b757b]">
                <AiOutlineClockCircle className="w-4 h-4"/>
                04:53
              </div>
              <div className="flex items-center gap-x-1 text-[14px] font-light text-[#6b757b]">
                <AiOutlineStar className="w-4 h-4"/>
                {book.averageRating}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
