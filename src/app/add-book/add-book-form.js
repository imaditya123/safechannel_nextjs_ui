"use client";

import { useState } from "react";
import languageOptions from "@/utils/languages";
import axiosInstance from "@/utils/axiosInstance";
import { useRouter } from "next/navigation";

const excludeFields = ["coverImageFile", "coverImagePreview"];

function serializeBook(book) {
  const filteredBook = Object.fromEntries(
    Object.entries(book).filter(([key]) => !excludeFields.includes(key))
  );
  return JSON.stringify(filteredBook);
}

const AddBookForm = () => {
  const defaultBook = {
    title: "",
    author: "",
    genre: "",
    coverImage: "",
    description: "",
    publicationYear: "",
    isbn: "",
    language: "",
    pages: "",
    publisher: "",
    rating: "",
    price: "",
    purchaseLink: "",
    featured: false,
    bestseller: false,
    releaseDate: "",
    ageGroup: "",
    coverImageFile: null, // New property to hold the selected image file
    coverImagePreview: null, // New property to hold the image preview
  };
  const router = useRouter();
  const [isBookAdded, setBookAdded] = useState(false);
  const [book, setBook] = useState(defaultBook);

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= 1900; year--) {
      years.push(year.toString());
    }
    return years;
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    // Update the state with the selected image file
    setBook({ ...book, coverImageFile: file });
     handleUpload(file);
    // Create a FileReader to read the image and set the preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setBook({ ...book, coverImagePreview: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
 
  };

  const handleUpload = async (file) => {
    try {
      if (!file) {
        console.error("No image selected");
        return;
      }

      const formData = new FormData();
      formData.append("file", file);

      const response = await axiosInstance.post("/aws/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const data=response.data;
      setBook({ ...book, coverImage: data });



     
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setBook({ ...book, [name]: checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add logic to handle form submission (e.g., send data to API)
    console.log("Book data submitted:", book);

    try {
      const response = await axiosInstance.post(
        "/books/add",
        serializeBook(book)
      );
      const data = response.data;
      console.log(data);
      setBook(defaultBook);
      setBookAdded(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" sm:w-2/3  md:w-1/2 mt-8 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add Book</h2>
      {isBookAdded && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-4 rounded shadow-md">
            <p className="text-lg font-semibold mb-2">
              Book Added Successfully!
            </p>
            <button
              onClick={() => {
                setBookAdded(false);
                router.back();
                router.back();
              }}
              className="bg-indigo-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-600"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={book.title}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* Author */}
        <div className="mb-4">
          <label
            htmlFor="author"
            className="block text-sm font-medium text-gray-600"
          >
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={book.author}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        {/* genre */}
        <div className="mb-4">
          <label
            htmlFor="genre"
            className="block text-sm font-medium text-gray-600"
          >
            Genre
          </label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={book.genre}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="isbn"
            className="block text-sm font-medium text-gray-600"
          >
            ISBN
          </label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            value={book.isbn}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* pages */}
        <div className="mb-4">
          <label
            htmlFor="pages"
            className="block text-sm font-medium text-gray-600"
          >
            Pages
          </label>
          <input
            type="number"
            id="pages"
            name="pages"
            value={book.pages}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* publisher */}
        <div className="mb-4">
          <label
            htmlFor="publisher"
            className="block text-sm font-medium text-gray-600"
          >
            Publisher
          </label>
          <input
            type="text"
            id="publisher"
            name="publisher"
            value={book.publisher}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* rating */}
        <div className="mb-4">
          <label
            htmlFor="rating"
            className="block text-sm font-medium text-gray-600"
          >
            Rating
          </label>
          <input
            type="text"
            id="rating"
            name="rating"
            value={book.rating}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* price */}
        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-600"
          >
            Price
          </label>
          <input
            type="text"
            id="price"
            name="price"
            value={book.price}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        {/*  */}
        <div className="mb-4">
          <label
            htmlFor="publicationYear"
            className="block text-sm font-medium text-gray-600"
          >
            Publication Year
          </label>
          <select
            id="publicationYear"
            name="publicationYear"
            value={book.publicationYear}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
          >
            <option value="" disabled>
              Select Year
            </option>
            {generateYearOptions().map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        {/*  */}
        <div className="mb-4">
          <label
            htmlFor="language"
            className="block text-sm font-medium text-gray-600"
          >
            Language
          </label>
          <select
            id="language"
            name="language"
            value={book.language}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
          >
            <option value="" disabled>
              Select a language
            </option>
            {languageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {/*  */}
        <div className="mb-4">
          <label
            htmlFor="ageGroup"
            className="block text-sm font-medium text-gray-600"
          >
            Age Group
          </label>
          <select
            id="ageGroup"
            name="ageGroup"
            value={book.ageGroup}
            onChange={handleInputChange}
            required
            className="mt-1 p-2 w-full border rounded-md"
          >
            <option value="" disabled>
              Select Age Group
            </option>
            <option value="Infant/Toddler">Infant/Toddler</option>
            <option value="Preschooler">Preschooler</option>
            <option value="Child">Child</option>
            <option value="Teenager/Adolescent">Teenager/Adolescent</option>
            <option value="Young Adult">Young Adult</option>
            <option value="Adult">Adult</option>
            <option value="Senior/Senior Citizen/Elderly">
              Senior/Senior Citizen/Elderly
            </option>
          </select>
        </div>

        {/* purchaseLink */}
        <div className="mb-4">
          <label
            htmlFor="purchaseLink"
            className="block text-sm font-medium text-gray-600"
          >
            Purchase Link
          </label>
          <input
            type="text"
            id="purchaseLink"
            name="purchaseLink"
            value={book.purchaseLink}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>

        {/* releaseDate */}
        <div className="mb-4">
          <label
            htmlFor="releaseDate"
            className="block text-sm font-medium text-gray-600"
          >
            Release Date
          </label>
          <input
            type="date"
            id="releaseDate"
            name="releaseDate"
            value={book.releaseDate}
            onChange={handleInputChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        {/* description */}

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-600"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={book.description}
            onChange={handleInputChange}
            rows="4"
            className="mt-1 p-2 w-full border rounded-md"
          ></textarea>
        </div>

        {/* coverImage */}
        <div className="mb-4">
          <label
            htmlFor="coverImage"
            className="block text-sm font-medium text-gray-600"
          >
            Cover Image
          </label>
          <input
            type="file"
            id="coverImage"
            name="coverImage"
            accept="image/*" // Allow only image files
            onChange={handleImageChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
          {book.coverImagePreview && (
            <img
              src={book.coverImagePreview}
              alt="Cover Preview"
              className="mt-2 w-full h-32 object-cover"
            />
          )}
        </div>

        {/* Featured */}
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="featured"
            name="featured"
            checked={book.featured}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label
            htmlFor="featured"
            className="text-sm font-medium text-gray-600"
          >
            Featured
          </label>
        </div>

        {/* Bestseller */}
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="bestseller"
            name="bestseller"
            checked={book.bestseller}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          <label
            htmlFor="bestseller"
            className="text-sm font-medium text-gray-600"
          >
            Bestseller
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Add Book
        </button>
      </form>
    </div>
  );
};

export default AddBookForm;
