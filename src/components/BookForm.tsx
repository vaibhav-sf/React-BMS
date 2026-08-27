import { useState } from "react";
import type { Book, BookType } from "../types/book";
import { useBookContext } from "../context/BookContext";

interface BookFormProps {
  onSubmitBook: (book: Book) => void;
  initialBook?: Book;
}

const GENRES = [
  "Religious",
  "Action",
  "Adventure",
  "Comedy",
  "Historical",
  "Mystery",
  "Romance",
  "Thriller",
  "Other",
];

const BookForm = ({ onSubmitBook, initialBook }: BookFormProps) => {
  const { books } = useBookContext();

  const [title, setTitle] = useState(initialBook?.title ?? "");

  const [author, setAuthor] = useState(initialBook?.author ?? "");

  const [isbn, setIsbn] = useState(initialBook?.isbn ?? "");

  const [publicationDate, setPublicationDate] = useState(
    initialBook?.publicationDate ?? "",
  );

  const [genre, setGenre] = useState(initialBook?.genre ?? "");

  const [bookType, setBookType] = useState<BookType | "">(
    initialBook?.bookType ?? "",
  );

  const [size, setSize] = useState(initialBook?.size?.toString() ?? "");

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!author.trim()) {
      newErrors.author = "Author is required";
    }

    if (!isbn.trim()) {
      newErrors.isbn = "ISBN is required";
    } else if (isNaN(Number(isbn))) {
      newErrors.isbn = "ISBN must be a number";
    } else if (isbn.length !== 10) {
      newErrors.isbn = "ISBN must be 10 digits";
    } else {
      const isDuplicateIsbn = books.some(
        (b) => b.isbn === isbn.trim() && b.id !== initialBook?.id,
      );
      if (isDuplicateIsbn) {
        newErrors.isbn = "Book with this ISBN already exists";
      }
    }

    if (!publicationDate) {
      newErrors.publicationDate = "Publication date is required";
    } else {
      const today = new Date();
      const selectedDate = new Date(publicationDate);

      today.setHours(0, 0, 0, 0);
      selectedDate.setHours(0, 0, 0, 0);

      if (selectedDate > today) {
        newErrors.publicationDate = "Publication date cannot be in the future";
      }
    }
    if (!genre) {
      newErrors.genre = "Genre is required";
    }

    if (!bookType) {
      newErrors.bookType = "Book type is required";
    }

    if (!size || Number(size) <= 0) {
      newErrors.size =
        bookType === "printed"
          ? "Pages must be greater than 0"
          : bookType === "ebook"
            ? "File size must be greater than 0"
            : "Size is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBookTypeChange = (newType: BookType) => {
    setBookType(newType);
    setSize("");
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated.size;
      delete updated.bookType;
      return updated;
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) return;

    const bookData: Book = {
      id: initialBook?.id ?? crypto.randomUUID(),

      title: title.trim(),
      author: author.trim(),
      isbn: isbn.trim(),
      publicationDate,
      genre,
      bookType: bookType as BookType,
      size: Number(size),
    };

    onSubmitBook(bookData);

    if (!initialBook) {
      setTitle("");
      setAuthor("");
      setIsbn("");
      setPublicationDate("");
      setGenre("");
      setBookType("");
      setSize("");
      setErrors({});
    }
  };

  const inputClasses: string =
    "w-full rounded-lg border border-slate-400 bg-slate-100 text-slate-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors";

  const labelClasses: string = "block text-sm font-medium text-slate-900 mb-1";

  const errorClasses: string = "text-red-400 text-xs mt-1";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Title */}
      <div className="text-slate-900">
        <label htmlFor="title" className={labelClasses}>
          Book Title
        </label>
        <input
          id="title"
          type="text"
          placeholder="Ramayana"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={inputClasses}
        />
        {errors.title && <p className={errorClasses}>{errors.title}</p>}
      </div>

      {/* Author */}
      <div>
        <label htmlFor="author" className={labelClasses}>
          Author
        </label>
        <input
          id="author"
          type="text"
          placeholder="Valmiki"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className={inputClasses}
        />
        {errors.author && <p className={errorClasses}>{errors.author}</p>}
      </div>

      {/* ISBN */}
      <div>
        <label htmlFor="isbn" className={labelClasses}>
          ISBN
        </label>
        <input
          id="isbn"
          type="text"
          placeholder="1234567890"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          className={inputClasses}
        />
        {errors.isbn && <p className={errorClasses}>{errors.isbn}</p>}
      </div>

      {/* Publication Date */}
      <div>
        <label htmlFor="publicationDate" className={labelClasses}>
          Publication Date
        </label>
        <input
          id="publicationDate"
          type="date"
          value={publicationDate}
          onChange={(e) => setPublicationDate(e.target.value)}
          className={inputClasses}
        />
        {errors.publicationDate && (
          <p className={errorClasses}>{errors.publicationDate}</p>
        )}
      </div>

      {/* Genre */}
      <div>
        <label htmlFor="genre" className={labelClasses}>
          Genre
        </label>
        <select
          id="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className={inputClasses}
        >
          <option value="">Select Genre</option>
          {GENRES.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
        {errors.genre && <p className={errorClasses}>{errors.genre}</p>}
      </div>

      {/* Book Type */}
      <div>
        <label htmlFor="bookType" className={labelClasses}>
          Book Type
        </label>
        <select
          id="bookType"
          value={bookType}
          onChange={(e) => handleBookTypeChange(e.target.value as BookType)}
          className={inputClasses}
        >
          <option value="">Select Book Type</option>
          <option value="printed">Printed Book</option>
          <option value="ebook">Ebook</option>
        </select>
        {errors.bookType && <p className={errorClasses}>{errors.bookType}</p>}
      </div>

      {/* Conditional Size Field */}
      <div>
        <label htmlFor="size" className={labelClasses}>
          {bookType === "ebook"
            ? "Size in MB"
            : bookType === "printed"
              ? "Size in Pages"
              : "Size"}
        </label>
        <input
          id="size"
          type="number"
          placeholder={
            bookType === "printed"
              ? "e.g. 250"
              : bookType === "ebook"
                ? "e.g. 5.5"
                : "e.g. 100"
          }
          value={size}
          step={bookType === "ebook" ? "0.1" : "1"}
          min="0"
          onChange={(e) => setSize(e.target.value)}
          className={inputClasses}
        />
        {errors.size && <p className={errorClasses}>{errors.size}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2.5 transition-colors cursor-pointer"
      >
        {initialBook ? "Update Book" : "Add Book"}
      </button>
    </form>
  );
};

export default BookForm;
