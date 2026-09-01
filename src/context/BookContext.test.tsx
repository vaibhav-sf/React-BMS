import { describe, expect, test } from "vitest";
import { render, screen, renderHook, act } from "@testing-library/react";
import { BookProvider, useBookContext } from "./BookContext";
import type { Book } from "../types/book";

const sampleBook: Book = {
  id: "1",
  title: "Ramayana",
  author: "Valmiki",
  isbn: "1234567890",
  publicationDate: "2020-01-01",
  genre: "Religious",
  bookType: "printed",
  size: 500,
};

const TestComponent = () => {
  const { books, addBook, updateBook, deleteBook } = useBookContext();

  return (
    <div>
      <div data-testid="book-count">{books.length}</div>
      {books.map((b) => (
        <div key={b.id} data-testid={`book-${b.id}`}>
          {b.title} - {b.author}
        </div>
      ))}
      <button
        onClick={() =>
          addBook({
            id: "2",
            title: "Mahabharata",
            author: "Vyasa",
            isbn: "0987654321",
            publicationDate: "2021-01-01",
            genre: "Religious",
            bookType: "printed",
            size: 600,
          })
        }
      >
        Add Book
      </button>
      <button
        onClick={() =>
          updateBook("1", {
            ...sampleBook,
            title: "Ramayana Updated",
          })
        }
      >
        Update Book
      </button>
      <button onClick={() => deleteBook("1")}>Delete Book</button>
    </div>
  );
};

describe("BookContext", () => {
  test("provides initial books and state update functions", () => {
    render(
      <BookProvider initialBooks={[sampleBook]}>
        <TestComponent />
      </BookProvider>
    );

    expect(screen.getByTestId("book-count")).toHaveTextContent("1");
    expect(screen.getByTestId("book-1")).toHaveTextContent("Ramayana - Valmiki");
  });

  test("addBook adds a new book to the context state", () => {
    const { result } = renderHook(() => useBookContext(), {
      wrapper: ({ children }) => (
        <BookProvider initialBooks={[sampleBook]}>{children}</BookProvider>
      ),
    });

    act(() => {
      result.current.addBook({
        id: "2",
        title: "Mahabharata",
        author: "Vyasa",
        isbn: "0987654321",
        publicationDate: "2021-01-01",
        genre: "Religious",
        bookType: "printed",
        size: 600,
      });
    });

    expect(result.current.books).toHaveLength(2);
    expect(result.current.books[1].title).toBe("Mahabharata");
  });

  test("updateBook modifies an existing book by id", () => {
    const { result } = renderHook(() => useBookContext(), {
      wrapper: ({ children }) => (
        <BookProvider initialBooks={[sampleBook]}>{children}</BookProvider>
      ),
    });

    act(() => {
      result.current.updateBook("1", {
        ...sampleBook,
        title: "Ramayana Edition 2",
      });
    });

    expect(result.current.books[0].title).toBe("Ramayana Edition 2");
  });

  test("deleteBook removes a book by id", () => {
    const { result } = renderHook(() => useBookContext(), {
      wrapper: ({ children }) => (
        <BookProvider initialBooks={[sampleBook]}>{children}</BookProvider>
      ),
    });

    act(() => {
      result.current.deleteBook("1");
    });

    expect(result.current.books).toHaveLength(0);
  });

  test("throws error when useBookContext is used outside BookProvider", () => {
    // Suppress console error during error boundary test
    const consoleError = console.error;
    console.error = () => {};

    expect(() => renderHook(() => useBookContext())).toThrow(
      "useBookContext must be used inside BookProvider"
    );

    console.error = consoleError;
  });
});
