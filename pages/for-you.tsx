import Image from "next/image";
import Link from "next/link";

import axios from "axios";
import { Book } from "@/typings";
import requests from "@/requests";
import BookSlider from "@/components/BookSlider";
import ContentLayout from "@/components/ContentLayout";

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
  return (
    <ContentLayout>
      {/* CONTENT SECTION */}
      <div className="mt-10 flex w-full max-w-[1070px] flex-col gap-y-3 pb-[80px]">
        {/* SELECTED BOOK */}
        <section>
          <h3 className="foryou__section--title">Selected just for you</h3>
          <Link
            href={`/book/${selected.id}`}
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
            We think you&apos;ll like these
          </span>
          <BookSlider books={recommended} />
        </section>

        {/* SUGGESTED */}
        <section className="mt-5">
          <h3 className="foryou__section--title">Suggested Books</h3>
          <span className="foryou__section--subtitle">Browse these books</span>
          <BookSlider books={suggested} />
        </section>
      </div>
    </ContentLayout>
  );
}
