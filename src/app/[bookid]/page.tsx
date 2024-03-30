"use client";

import { addPage, deleteBook, getBook } from "@/services/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Response {
  name: string;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: any[]; // You can replace 'any[]' with a more specific type if you have information about the permissions
  pages: Page[];
  $databaseId: string;
  $collectionId: string;
}

interface Page {
  title: string;
  content: string;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: any[]; // You can replace 'any[]' with a more specific type if you have information about the permissions
  $databaseId: string;
  $collectionId: string;
}

export default function Home({ params }: { params: { bookid: string } }) {
  const [book, setBook] = useState<Response>();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  useEffect(() => {
    const pro = getBook(params.bookid);
    pro.then(
      (data: any) => {
        console.log(data);
        setBook(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }, [params.bookid]);

  // function to add page

  const handle = async () => {
    const res = await addPage(title, content, params.bookid);
    if (res) {
      setOpen(false);
      window.location.reload();
    }
  };

  const handleDelete = async () => {
    const pro = await deleteBook(params.bookid);
    if (pro) {
      router.push("/");
    }
  };

  return (
    <div>
      <div>{book && book.name}</div>
      <div>
        {book?.pages.map((page) => {
          return <Page bookId={params.bookid} key={page.$id} page={page} />;
        })}
      </div>
      <div className="space-x-5">
        <button
          onClick={() => setOpen(true)}
          className="bg-green-500 rounded-md p-1 text-white font-semibold"
        >
          Add Page
        </button>
        <button
          onClick={() => handleDelete()}
          className="bg-red-500 my-2 rounded-md p-1 text-white font-semibold"
        >
          Delete Book
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
            <p>Title</p>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-1 rounded-md outline-none"
              type="text"
            ></input>
            <p>Content</p>
            <input
              value={content}
              onChange={(e) => setContent(e.target.value)}
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

function Page({ page, bookId }: { page: Page; bookId: string }) {
  return (
    <Link
      href={`/${bookId}/${page.$id}`}
      className="bg-green-400 m-2 rounded-md px-2 py-1 block text-white font-semibold cursor-pointer"
    >
      {page.title}
    </Link>
  );
}
