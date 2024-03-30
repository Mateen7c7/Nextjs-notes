"use client";

import { deletePage, getPage, updatePage } from "@/services/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Book = {
  name: string;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: any[]; // Assuming permissions can be of any type
  $databaseId: string;
  $collectionId: string;
};

type Data = {
  title: string;
  content: string;
  $id: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: any[]; // Assuming permissions can be of any type
  book: Book;
  $databaseId: string;
  $collectionId: string;
};
export default function Home({ params }: { params: { pageId: string } }) {
  const [page, setPage] = useState<Data>();
  const [value, setValue] = useState("");
  const router = useRouter();
  useEffect(() => {
    const pro = getPage(params.pageId);
    pro.then(
      (data: any) => {
        console.log(data);
        setPage(data);
        setValue(page?.content!);
      },
      (err) => {
        console.log(err);
      }
    );
  }, [params.pageId, page?.content]);

  //   function to update page

  const updatePageData = async () => {
    const res = await updatePage(params.pageId, value);
    if (res) {
      console.log("page updated");
      window.location.reload();
    }
  };
  const handleDelete = async () => {
    const pro = await deletePage(params.pageId);
    if (pro) {
      router.push("/");
    }
  };
  return (
    <div>
      {page && page.title}

      <div>
        <textarea
          value={value}
          maxLength={10000}
          className="w-full p-2 border border-green-500 "
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </div>
      <div className="space-x-5">
        <button
          onClick={updatePageData}
          className="bg-green-500 rounded-md p-1 text-white font-semibold"
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 rounded-md p-1 text-white font-semibold"
        >
          Delete Page
        </button>
      </div>
    </div>
  );
}
