import { useRouter } from "next/router";
import { Book } from "@/typings";
import { useEffect, useState } from "react";
import { FETCH_BY_ID_URL } from "@/requests";
import axios from "axios";

export default function Book() {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState<Book>();

  const getBook = async () => {
    const { data } = await axios.get(`${FETCH_BY_ID_URL + id}`);
    setBook(data);
    console.log(data);
  };
  useEffect(() => {
    getBook();
  }, []);
  return <>This is the books page for {id}</>;
}
