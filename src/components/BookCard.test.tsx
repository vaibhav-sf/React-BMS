import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import BookCard from "./BookCard";
import type { Book } from "../types/book";

const printedBook: Book = {
  id: "1",
  title: "Ramayana",
  author: "Valmiki",
  isbn: "1234567890",
  publicationDate: "2020-01-01",
  genre: "Religious",
  bookType: "printed",
  size: 500,
};

const ebook: Book = {
  id: "2",
  title: "Clean Code",
  author: "Robert C. Martin",
  isbn: "0987654321",
  publicationDate: "2008-08-01",
  genre: "Other",
  bookType: "ebook",
  size: 15,
};

describe("BookCard", () => {
  test("renders printed book details correctly", () => {
    render(
      <MemoryRouter>
        <BookCard book={printedBook} onDelete={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByText("Ramayana")).toBeInTheDocument();
    expect(screen.getByText("Valmiki")).toBeInTheDocument();
    expect(screen.getByText("Religious")).toBeInTheDocument();
    expect(screen.getByText("500 pages")).toBeInTheDocument();
    expect(screen.getByText("Printed")).toBeInTheDocument();
  });

  test("renders ebook details correctly", () => {
    render(
      <MemoryRouter>
        <BookCard book={ebook} onDelete={vi.fn()} />
      </MemoryRouter>
    );

    expect(screen.getByText("Clean Code")).toBeInTheDocument();
    expect(screen.getByText("Robert C. Martin")).toBeInTheDocument();
    expect(screen.getByText("15 MB")).toBeInTheDocument();
    expect(screen.getByText("Ebook")).toBeInTheDocument();
  });

  test("contains navigation links for View and Edit", () => {
    render(
      <MemoryRouter>
        <BookCard book={printedBook} onDelete={vi.fn()} />
      </MemoryRouter>
    );

    const viewLink = screen.getByRole("link", { name: "View" });
    const editLink = screen.getByRole("link", { name: "Edit" });

    expect(viewLink).toHaveAttribute("href", "/books/1");
    expect(editLink).toHaveAttribute("href", "/books/edit/1");
  });

  test("opens delete confirmation modal when Delete button is clicked and triggers onDelete on confirmation", async () => {
    const onDelete = vi.fn();
    render(
      <MemoryRouter>
        <BookCard book={printedBook} onDelete={onDelete} />
      </MemoryRouter>
    );

    // Modal is initially not open
    expect(screen.queryByText(/Are you sure you want to delete/i)).not.toBeInTheDocument();

    // Click Delete button on card
    await userEvent.click(screen.getByRole("button", { name: "Delete" }));

    // Modal should now be open
    expect(screen.getByText(/Are you sure you want to delete "Ramayana"/i)).toBeInTheDocument();

    // Click confirm inside modal
    const confirmButton = screen.getAllByRole("button", { name: "Delete" })[1];
    await userEvent.click(confirmButton);

    expect(onDelete).toHaveBeenCalledWith("1");
  });
});
