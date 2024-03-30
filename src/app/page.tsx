"use client";

import { addBook, getAllBooks } from "@/services/api";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [books, setBooks] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  useEffect(() => {
    const pro = getAllBooks();
    pro.then(
      (data: any) => {
        console.log(data);
        setBooks(data.documents as never[]);
      },
      (err) => {
        console.log(err);
      }
    );
  }, []);
  const handle = async () => {
    const pro = await addBook(name);
    if (pro) {
      setOpen(false);
      window.location.reload();
    }
  };

  return (
    <div className="">
      <div className="flex gap-3">
        {books.map((book: any) => {
          return <Book key={book.$id} book={book} />;
        })}
      </div>
      <div className="space-x-5">
        <button
          onClick={() => setOpen(true)}
          className="bg-green-500 my-2 rounded-md p-1 text-white font-semibold"
        >
          Add Book
        </button>
      </div>
      {open && (
        <div className="w-full h-screen absolute top-0 left-0 backdrop-blur-md center	">
          <div
            onClick={() => setOpen(false)}
            className="absolute top-10 right-10 cursor-pointer"
          >
            <p className="text-2xl text-green-500">X</p>
          </div>
          <div className="bg-gray-100 rounded-md p-2 space-y-2">
            <p>Name</p>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-1 rounded-md outline-none"
              type="text"
            ></input>

            <div className="center">
              <button
                onClick={() => handle()}
                className="bg-green-500 my-2 rounded-md p-1 text-white font-semibold"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Book({ book }: { book: any }) {
  return (
    <Link href={`/${book.$id}`}>
      <div className="bg-green-400 h-[100px] w-[100px] rounded-md center cursor-pointer">
        <p className=" text-white font-semibold">
          {" "}
          {book.name.toLocaleUpperCase()}
        </p>
      </div>
    </Link>
  );
}
