import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { BookProvider } from "../context/BookContext";
import Books from "./Books";
import type { Book } from "../types/book";

const booksData: Book[] = [
  {
    id: "1",
    title: "Ramayana",
    author: "Valmiki",
    isbn: "1234567890",
    publicationDate: "2020-01-01",
    genre: "Religious",
    bookType: "printed",
    size: 500,
  },
  {
    id: "2",
    title: "Clean Code",
    author: "Robert C. Martin",
    isbn: "0987654321",
    publicationDate: "2008-08-01",
    genre: "Other",
    bookType: "ebook",
    size: 15,
  },
];

describe("Books Page Integration", () => {
  test("renders all books initially and updates total count header", () => {
    render(
      <MemoryRouter>
        <BookProvider initialBooks={booksData}>
          <Books />
        </BookProvider>
      </MemoryRouter>
    );

    expect(screen.getByText("2 of 2 books")).toBeInTheDocument();
    expect(screen.getByText("Ramayana")).toBeInTheDocument();
    expect(screen.getByText("Clean Code")).toBeInTheDocument();
  });

  test("filters books live by search query title or author", async () => {
    render(
      <MemoryRouter>
        <BookProvider initialBooks={booksData}>
          <Books />
        </BookProvider>
      </MemoryRouter>
    );

    const searchInput = screen.getByPlaceholderText("Search by title or author");
    await userEvent.type(searchInput, "Robert");

    expect(screen.getByText("1 of 2 books")).toBeInTheDocument();
    expect(screen.getByText("Clean Code")).toBeInTheDocument();
    expect(screen.queryByText("Ramayana")).not.toBeInTheDocument();
  });

  test("filters books by selected genre dropdown", async () => {
    render(
      <MemoryRouter>
        <BookProvider initialBooks={booksData}>
          <Books />
        </BookProvider>
      </MemoryRouter>
    );

    const genreSelect = screen.getByRole("combobox");
    await userEvent.selectOptions(genreSelect, "Religious");

    expect(screen.getByText("1 of 2 books")).toBeInTheDocument();
    expect(screen.getByText("Ramayana")).toBeInTheDocument();
    expect(screen.queryByText("Clean Code")).not.toBeInTheDocument();
  });
});
