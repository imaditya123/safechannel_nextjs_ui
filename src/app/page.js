"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

import AppHeader from "./app_header";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const userToken = localStorage.getItem("authToken");
    if (!userToken) {
      router.replace("/login");
    }
  }, [router]);

  const books =  [
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      genre: 'Fiction',
      coverImage: '	https://picsum.photos/seed/picsum/536/354',
    },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      genre: 'Mystery',
      coverImage: '	https://picsum.photos/seed/picsum/536/354',
    },
    {
      id: 3,
      title: '1984',
      author: 'George Orwell',
      genre: 'Science Fiction',
      coverImage: '	https://picsum.photos/seed/picsum/536/354',
    },
    {
      id: 4,
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      genre: 'Romance',
      coverImage: '	https://picsum.photos/seed/picsum/536/354',
    },
    {
      id: 5,
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      genre: 'Drama',
      coverImage: '	https://picsum.photos/seed/picsum/536/354',
    },
    // Add more book entries as needed
  ];

  return (
    <>
    <div>
      <AppHeader />
      <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-4">Book List</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => (
          <li key={book.id} className="bg-white p-4 rounded shadow-md">
            <div className="mb-4">
              <img
                src={book.coverImage}
                alt={`Cover of ${book.title}`}
                className="w-full h-40 object-cover rounded"
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">{book.title}</h3>
            <p className="text-gray-600">Author: {book.author}</p>
            <p className="text-gray-600">Genre: {book.genre}</p>
          </li>
        ))}
      </ul>
    </div>
    </div>
    </>
  );
};
export default Home;
