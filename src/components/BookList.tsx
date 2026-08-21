import { useBookContext } from "../context/BookContext";
import BookCard from "./BookCard";
import type { Book } from "../types/book";

interface BookListProps {
  books?: Book[];
}

const BookList = ({ books: filteredBooks }: BookListProps) => {

  const { books: allBooks, deleteBook } = useBookContext();

  const booksToShow = filteredBooks ?? allBooks;

  if (booksToShow.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📚</div>
        <h3 className="text-xl font-semibold text-slate-300 mb-2">
          No books found
        </h3>
        <p className="text-slate-500">
          Add your first book to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {booksToShow.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onDelete={deleteBook}
        />
      ))}
    </div>
  );
};

export default BookList;