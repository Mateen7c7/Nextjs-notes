import { Client, Databases } from "appwrite";

export const client = new Client();

client
  .setEndpoint("http://localhost:3030/v1")
  .setProject("65fd0662aac70dd398cc");

export const databases = new Databases(client);

export const notesDatabaseId = "65fd0698edd62ebf8048";
export const booksCollectionId = "65fd0b628fa6735ae7ec";
export const pagesCollectionId = "65fd06a4d30456ff91ff";
