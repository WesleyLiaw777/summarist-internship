import { Book } from "@/typings";
import Image from "next/image";
import Link from "next/link";

interface BookSliderProps {
  books: Book[];
}

export default function BookSlider({ books }: BookSliderProps) {
  return (
    <div className="mt-8 flex snap-x gap-x-4 overflow-x-auto px-3">
      {books?.map((book) => (
        <Link
          href={`/book/${book.id}`}
          className="relative flex w-full max-w-[200px] flex-shrink-0 snap-start flex-col gap-y-2 rounded px-4 pb-6 pt-8 hover:bg-[#f1f6f4]"
          key={book.id}
        >
          {book.subscriptionRequired && (
            <div className="absolute right-0 top-0 flex h-[18px] items-center rounded-[20px] bg-[#032b41] px-2 text-[10px] text-white">
              Premium
            </div>
          )}
          <Image
            src={`${book.imageLink}`}
            width={172}
            height={172}
            alt="book image"
          />
          <span className="font-bold leading-[18px] text-[#032b41]">
            {book.title}
          </span>
          <span className="text-sm font-light text-[#6b757b]">
            {book.author}
          </span>
          <span className="text-sm text-[#394547]">{book.subTitle}</span>
        </Link>
      ))}
    </div>
  );
}
