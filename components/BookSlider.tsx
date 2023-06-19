import { Book } from "@/typings";
import Image from "next/image";
import Link from "next/link";

interface BookSliderProps {
  books: Book[];
}

export default function BookSlider({ books }: BookSliderProps) {
  return (
    <div className="flex w-full snap-x overflow-x-auto gap-x-6">
      {books?.map((book) => (
        <Link
        href={`/`}
        key={book.id}
        className="flex flex-shrink-0 snap-start flex-col">
          <Image
            src={`${book.imageLink}`}
            width={172}
            height={172}
            alt="book image"
          />
        </Link>
      ))}
    </div>
  );
}
