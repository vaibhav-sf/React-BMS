import { Link } from "react-router-dom";
import type { Book } from "../types/book";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

interface BookCardProps {
  book: Book;
  onDelete: (id: string) => void;
}

const BookCard = ({
  book,
  onDelete,
}: BookCardProps) => {

  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    onDelete(book.id);
    setShowModal(false);
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-slate-300 transition-all group">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-black truncate pr-2">
          {book.title}
        </h3>

        <span
          className={`shrink-0 text-xs font-medium px-2.5 py-0.5 rounded-full ${book.bookType === "printed"
            ? "bg-blue-50 text-blue-700"
            : "bg-emerald-50 text-emerald-700"
            }`}
        >
          {book.bookType === "printed"
            ? "Printed"
            : "Ebook"}
        </span>
      </div>

      {/* Info */}
      <div className="space-y-1.5 text-sm text-slate-600 mb-4">
        <p>
          <span className="text-slate-800">Author:</span>{" "}
          {book.author}
        </p>
        <p>
          <span className="text-slate-800">Genre:</span>{" "}
          {book.genre}
        </p>
        <p>
          <span className="text-slate-800">
            {book.bookType === "printed"
              ? "Pages:"
              : "Size:"}
          </span>{" "}
          {book.bookType === "printed"
            ? `${book.size} pages`
            : `${book.size} MB`}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap sm:flex-nowrap gap-2 pt-4 border-t border-slate-200">
        <Link
          to={`/books/${book.id}`}
          className="flex-1 min-w-[70px] text-center text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 py-2 transition-colors"
        >
          View
        </Link>

        <Link
          to={`/books/edit/${book.id}`}
          className="flex-1 min-w-[70px] text-center text-sm font-medium bg-green-600 hover:bg-green-700 text-white rounded-lg px-3 py-2 transition-colors"
        >
          Edit
        </Link>

        <button
          onClick={() => setShowModal(true)}
          className="flex-1 min-w-[70px] text-center text-sm font-medium bg-red-600 hover:bg-red-700 text-white rounded-lg px-3 py-2 transition-colors cursor-pointer"
        >
          Delete
        </button>
        <ConfirmModal isOpen={showModal}
          title="Delete Book"
          message={`Are you sure you want to delete "${book.title}"? This action cannot be undone.`}
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
        />
      </div>
    </div>
  );
};

export default BookCard;