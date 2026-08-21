import BookForm from "../components/BookForm";
import { useBookContext } from "../context/BookContext";
import { useNavigate } from "react-router-dom";
import type { Book } from "../types/book";

const AddBook = () => {

  const { addBook } = useBookContext();
  const navigate = useNavigate();

  const handleAddBook = (book: Book) => {
    addBook(book);
    navigate("/books");
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold text-slate-900">
          Add New Book
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Fill in the details below to add a new book
        </p>
      </div>

      <div className="max-w-lg bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
        <BookForm onSubmitBook={handleAddBook} />
      </div>
    </div>
  );
};

export default AddBook;