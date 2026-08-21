import { useState } from "react";
import { Link } from "react-router-dom";
import { useBookContext } from "../context/BookContext";
import BookList from "../components/BookList";
import SearchBar from "../components/SearchBar";
import GenreFilter from "../components/GenreFilter";

const Books = () => {

  const { books } = useBookContext();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");

  const filteredBooks = books.filter((book) => {

    const matchesSearch =
      searchQuery === "" ||
      book.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      book.author
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesGenre =
      selectedGenre === "" ||
      book.genre === selectedGenre;

    return matchesSearch && matchesGenre;
  });

  return (
    <div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Books
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            {filteredBooks.length} of {books.length} books
          </p>
        </div>

        <Link
          to="/books/add"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 text-sm transition-colors text-center"
        >
          + Add Book
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1">
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>
        <GenreFilter
          selectedGenre={selectedGenre}
          onGenreChange={setSelectedGenre}
        />
      </div>

      {/* Book List */}
      <BookList books={filteredBooks} />

    </div>
  );
};

export default Books;