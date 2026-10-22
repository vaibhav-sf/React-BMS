import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { BookProvider } from "../context/BookContext";
import BookList from "./BookList";
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

describe("BookList", () => {
  test("renders books when books are available", () => {
    render(
      <MemoryRouter>
        <BookProvider initialBooks={[sampleBook]}>
          <BookList />
        </BookProvider>
      </MemoryRouter>,
    );

    expect(screen.getByText("Ramayana")).toBeInTheDocument();
    expect(screen.getByText("Valmiki")).toBeInTheDocument();
    expect(screen.getByText("Religious")).toBeInTheDocument();
    expect(screen.getByText("500 pages")).toBeInTheDocument();
  });

  test("shows empty state when there are no books", () => {
    render(
      <BookProvider>
        <BookList />
      </BookProvider>,
    );

    expect(screen.getByText("No books found")).toBeInTheDocument();

    expect(
      screen.getByText("Add your first book to get started!"),
    ).toBeInTheDocument();
  });

  test("renders filtered books when books prop is provided", () => {
    const filteredBook: Book = {
      ...sampleBook,
      id: "2",
      title: "Mahabharata",
      author: "Vyasa",
    };

    render(
      <MemoryRouter>
        <BookProvider initialBooks={[sampleBook]}>
          <BookList books={[filteredBook]} />
        </BookProvider>
      </MemoryRouter>,
    );

    expect(screen.getByText("Mahabharata")).toBeInTheDocument();

    expect(screen.queryByText("Ramayana")).not.toBeInTheDocument();
  });
});
