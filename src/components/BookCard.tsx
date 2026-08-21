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

  const [showModel, setShowModel] = useState(false);

  const handleDelete = () => {
    onDelete(book.id);
    setShowModel(false);
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 hover:border-slate-600 transition-colors group">

      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-black truncate pr-2">
          {book.title}
        </h3>

        <span
          className={`shrink-0 text-xs font-medium px-2.5 py-0.5 rounded-full ${book.bookType === "printed"
            ? "bg-blue-600/20 text-blue-400"
            : "bg-emerald-600/20 text-emerald-400"
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
      <div className="flex gap-2 pt-3 border-t border-slate-700">
        <Link
          to={`/books/${book.id}`}
          className="flex-1 text-center text-sm bg-blue-500 hover:bg-blue-700 text-slate-200 rounded-lg px-3 py-1.5 transition-colors"
        >
          View
        </Link>

        <Link
          to={`/books/edit/${book.id}`}
          className="flex-1 text-center text-sm bg-green-500 hover:bg-green-700 text-slate-200 rounded-lg px-3 py-1.5 transition-colors"
        >
          Edit
        </Link>

        <button
          onClick={() => setShowModel(true)}
          className="flex-1 text-sm bg-red-500 hover:bg-red-700 text-slate-200 rounded-lg px-3 py-1.5 transition-colors cursor-pointer"
        >
          Delete
        </button>
        <ConfirmModal isOpen={showModel}
          title="Delete Book"
          message={`Are you sure you want to delete "${book.title}"?.This cannot be undone `}
          onConfirm={handleDelete}
          onCancel={() => setShowModel(false)}
        />
      </div>
    </div>
  );
};

export default BookCard;