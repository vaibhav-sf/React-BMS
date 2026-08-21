import { useNavigate, useParams } from "react-router-dom";
import BookForm from "../components/BookForm";
import { useBookContext } from "../context/BookContext";
import type { Book } from "../types/book";

const EditBook = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  const { books, updateBook } = useBookContext();

  const book = books.find(
    (book) => book.id === id
  );

  if (!book) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Book Not Found
        </h1>
        <p className="text-slate-600 mb-6">
          The book you're trying to edit doesn't exist.
        </p>
        <button
          onClick={() => navigate("/books")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 transition-colors cursor-pointer"
        >
          Back to Books
        </button>
      </div>
    );
  }

  const handleUpdateBook = (
    updatedBook: Book
  ) => {
    updateBook(book.id, updatedBook);
    navigate(`/books/${book.id}`);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Edit Book
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Update the details for "{book.title}"
        </p>
      </div>

      <div className="max-w-lg bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
        <BookForm
          initialBook={book}
          onSubmitBook={handleUpdateBook}
        />
      </div>
    </div>
  );
};

export default EditBook;