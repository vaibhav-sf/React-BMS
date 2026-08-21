import { Link, useParams } from "react-router-dom";
import { useBookContext } from "../context/BookContext";

const BookDetails = () => {

  const { id } = useParams();
  const { books } = useBookContext();

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
        <p className="text-slate-500 mb-6">
          The book you're looking for doesn't exist.
        </p>
        <Link
          to="/books"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 transition-colors"
        >
          Back to Books
        </Link>
      </div>
    );
  }

  const details = [
    { label: "Author", value: book.author },
    { label: "ISBN", value: book.isbn },
    {
      label: "Publication Date",
      value: book.publicationDate,
    },
    { label: "Genre", value: book.genre },
    {
      label: "Book Type",
      value:
        book.bookType === "printed"
          ? "Printed Book"
          : "Ebook",
    },
    {
      label:
        book.bookType === "printed"
          ? "Size (Pages)"
          : "Size (MB)",
      value:
        book.bookType === "printed"
          ? `${book.size} pages`
          : `${book.size} MB`,
    },
  ];

  return (
    <div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold text-slate-900">
            {book.title}
          </h1>
          <span
            className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${book.bookType === "printed"
              ? "bg-blue-100 text-blue-700"
              : "bg-emerald-100 text-emerald-700"
              }`}
          >
            {book.bookType === "printed"
              ? "Printed"
              : "Ebook"}
          </span>
        </div>

        <div className="flex gap-2">
          <Link
            to={`/books/edit/${book.id}`}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 text-sm transition-colors"
          >
            Edit Book
          </Link>
          <Link
            to="/books"
            className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-lg px-4 py-2 text-sm transition-colors"
          >
            Back to Books
          </Link>
        </div>
      </div>

      {/* Detail Card */}
      <div className="max-w-2xl bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
        <div className="space-y-4">
          {details.map((detail) => (
            <div
              key={detail.label}
              className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-0"
            >
              <span className="text-sm text-slate-500 sm:w-40 shrink-0">
                {detail.label}
              </span>
              <span className="text-slate-900 font-medium">
                {detail.value}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default BookDetails;