import {
  booksCollectionId,
  databases,
  notesDatabaseId,
  pagesCollectionId,
} from "../appwrite";
import { v4 as ID } from "uuid";

export const getAllBooks = async () => {
  return await databases.listDocuments(notesDatabaseId, booksCollectionId);
};

export const getBook = async (id: string) => {
  return await databases.getDocument(notesDatabaseId, booksCollectionId, id);
};

export const addBook = async (title: string) => {
  return await databases.createDocument(
    notesDatabaseId,
    booksCollectionId,
    ID(),
    {
      name:title,
    }
  );
};

export const updateBook = async (id: string, title: string) => {
  return await databases.updateDocument(
    notesDatabaseId,
    booksCollectionId,
    id,
    {
      title,
    }
  );
};

export const deleteBook = async (id: string) => {
  return await databases.deleteDocument(notesDatabaseId, booksCollectionId, id);
};

// get page

export const getPage = async (id: string) => {
  return await databases.getDocument(notesDatabaseId, pagesCollectionId, id);
};

export const deletePage = async (id: string) => {
  return await databases.deleteDocument(notesDatabaseId, pagesCollectionId, id);
};

export const updatePage = async (id: string, content: string) => {
  return await databases.updateDocument(
    notesDatabaseId,
    pagesCollectionId,
    id,
    {
      content,
    }
  );
};

// add Page

export const addPage = async (
  title: string,
  content: string,
  bookId: string
) => {
  return await databases.createDocument(
    notesDatabaseId,
    pagesCollectionId,
    ID(),
    {
      title,
      content,
      book: bookId,
    }
  );
};
