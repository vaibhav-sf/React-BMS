import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import BookForm from "./BookForm";
import { BookProvider } from "../context/BookContext";
import type { Book } from "../types/book";

describe("BookForm", () => {
  test("renders the book form", () => {
    const onSubmitBook = vi.fn();

    render(
      <BookProvider>
        <BookForm onSubmitBook={onSubmitBook} />
      </BookProvider>,
    );

    expect(screen.getByPlaceholderText("Ramayana")).toBeInTheDocument();

    expect(screen.getByPlaceholderText("Valmiki")).toBeInTheDocument();

    expect(screen.getByPlaceholderText("1234567890")).toBeInTheDocument();
  });
  test("shows validation errors when required fields are empty", async () => {
    const onSubmitBook = vi.fn();

    render(
      <BookProvider>
        <BookForm onSubmitBook={onSubmitBook} />
      </BookProvider>,
    );

    const submitButton = screen.getByRole("button", {
      name: "Add Book",
    });

    await userEvent.click(submitButton);

    expect(screen.getByText("Title is required")).toBeInTheDocument();

    expect(screen.getByText("Author is required")).toBeInTheDocument();

    expect(screen.getByText("ISBN is required")).toBeInTheDocument();

    expect(
      screen.getByText("Publication date is required"),
    ).toBeInTheDocument();

    expect(screen.getByText("Genre is required")).toBeInTheDocument();

    expect(screen.getByText("Book type is required")).toBeInTheDocument();

    expect(screen.getByText("Size is required")).toBeInTheDocument();

    expect(onSubmitBook).not.toHaveBeenCalled();
  });

  test("shows an error when ISBN is not 10 digits", async () => {
    const onSubmitBook = vi.fn();

    render(
      <BookProvider>
        <BookForm onSubmitBook={onSubmitBook} />
      </BookProvider>,
    );

    await userEvent.type(screen.getByLabelText("ISBN"), "12345");

    await userEvent.click(
      screen.getByRole("button", {
        name: "Add Book",
      }),
    );

    expect(screen.getByText("ISBN must be 10 digits")).toBeInTheDocument();

    expect(onSubmitBook).not.toHaveBeenCalled();
  });
  test("submits a valid book", async () => {
    const onSubmitBook = vi.fn();

    render(
      <BookProvider>
        <BookForm onSubmitBook={onSubmitBook} />
      </BookProvider>,
    );

    await userEvent.type(screen.getByLabelText("Book Title"), "Ramayana");

    await userEvent.type(screen.getByLabelText("Author"), "Valmiki");

    await userEvent.type(screen.getByLabelText("ISBN"), "1234567890");

    await userEvent.type(
      screen.getByLabelText("Publication Date"),
      "2020-01-01",
    );

    await userEvent.selectOptions(screen.getByLabelText("Genre"), "Religious");

    await userEvent.selectOptions(
      screen.getByLabelText("Book Type"),
      "printed",
    );

    await userEvent.type(screen.getByLabelText("Size in Pages"), "500");

    await userEvent.click(
      screen.getByRole("button", {
        name: "Add Book",
      }),
    );

    expect(onSubmitBook).toHaveBeenCalledTimes(1);

    expect(onSubmitBook).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Ramayana",
        author: "Valmiki",
        isbn: "1234567890",
        publicationDate: "2020-01-01",
        genre: "Religious",
        bookType: "printed",
        size: 500,
      }),
    );
  });
  test("resets the form after successfully adding a book", async () => {
    const onSubmitBook = vi.fn();

    render(
      <BookProvider>
        <BookForm onSubmitBook={onSubmitBook} />
      </BookProvider>,
    );

    await userEvent.type(screen.getByLabelText("Book Title"), "Ramayana");

    await userEvent.type(screen.getByLabelText("Author"), "Valmiki");

    await userEvent.type(screen.getByLabelText("ISBN"), "1234567890");

    await userEvent.type(
      screen.getByLabelText("Publication Date"),
      "2020-01-01",
    );

    await userEvent.selectOptions(screen.getByLabelText("Genre"), "Religious");

    await userEvent.selectOptions(
      screen.getByLabelText("Book Type"),
      "printed",
    );

    await userEvent.type(screen.getByLabelText("Size in Pages"), "500");

    await userEvent.click(
      screen.getByRole("button", {
        name: "Add Book",
      }),
    );

    expect(screen.getByLabelText("Book Title")).toHaveValue("");

    expect(screen.getByLabelText("Author")).toHaveValue("");

    expect(screen.getByLabelText("ISBN")).toHaveValue("");

    expect(screen.getByLabelText("Genre")).toHaveValue("");

    expect(screen.getByLabelText("Book Type")).toHaveValue("");

    expect(screen.getByLabelText("Size")).toHaveValue(null);
  });
  test("shows an error when ISBN already exists", async () => {
    const onSubmitBook = vi.fn();

    const existingBook: Book = {
      id: "1",
      title: "Existing Book",
      author: "Existing Author",
      isbn: "1234567890",
      publicationDate: "2020-01-01",
      genre: "Religious",
      bookType: "printed",
      size: 300,
    };

    render(
      <BookProvider initialBooks={[existingBook]}>
        <BookForm onSubmitBook={onSubmitBook} />
      </BookProvider>,
    );
    await userEvent.type(screen.getByLabelText("Book Title"), "Another Book");

    await userEvent.type(screen.getByLabelText("Author"), "Another Author");

    await userEvent.type(screen.getByLabelText("ISBN"), "1234567890");

    await userEvent.type(
      screen.getByLabelText("Publication Date"),
      "2020-01-01",
    );

    await userEvent.selectOptions(screen.getByLabelText("Genre"), "Action");

    await userEvent.selectOptions(
      screen.getByLabelText("Book Type"),
      "printed",
    );

    await userEvent.type(screen.getByLabelText("Size in Pages"), "200");

    await userEvent.click(
      screen.getByRole("button", {
        name: "Add Book",
      }),
    );

    expect(
      screen.getByText("Book with this ISBN already exists"),
    ).toBeInTheDocument();

    expect(onSubmitBook).not.toHaveBeenCalled();
  });
  test("shows an error when publication date is in the future", async () => {
    const onSubmitBook = vi.fn();

    render(
      <BookProvider>
        <BookForm onSubmitBook={onSubmitBook} />
      </BookProvider>,
    );

    await userEvent.type(screen.getByLabelText("Book Title"), "Future Book");

    await userEvent.type(screen.getByLabelText("Author"), "Future Author");

    await userEvent.type(screen.getByLabelText("ISBN"), "9876543210");

    await userEvent.type(
      screen.getByLabelText("Publication Date"),
      "2099-01-01",
    );

    await userEvent.selectOptions(screen.getByLabelText("Genre"), "Action");

    await userEvent.selectOptions(
      screen.getByLabelText("Book Type"),
      "printed",
    );

    await userEvent.type(screen.getByLabelText("Size in Pages"), "200");

    await userEvent.click(
      screen.getByRole("button", {
        name: "Add Book",
      }),
    );

    expect(
      screen.getByText("Publication date cannot be in the future"),
    ).toBeInTheDocument();

    expect(onSubmitBook).not.toHaveBeenCalled();
  });

  test("renders initial book details and 'Update Book' button in edit mode", () => {
    const onSubmitBook = vi.fn();
    const existingBook: Book = {
      id: "1",
      title: "Ramayana",
      author: "Valmiki",
      isbn: "1234567890",
      publicationDate: "2020-01-01",
      genre: "Religious",
      bookType: "printed",
      size: 500,
    };

    render(
      <BookProvider initialBooks={[existingBook]}>
        <BookForm initialBook={existingBook} onSubmitBook={onSubmitBook} />
      </BookProvider>,
    );

    expect(screen.getByLabelText("Book Title")).toHaveValue("Ramayana");
    expect(screen.getByLabelText("Author")).toHaveValue("Valmiki");
    expect(screen.getByLabelText("ISBN")).toHaveValue("1234567890");
    expect(screen.getByRole("button", { name: "Update Book" })).toBeInTheDocument();
  });

  test("allows keeping existing ISBN when updating book in edit mode", async () => {
    const onSubmitBook = vi.fn();
    const existingBook: Book = {
      id: "1",
      title: "Ramayana",
      author: "Valmiki",
      isbn: "1234567890",
      publicationDate: "2020-01-01",
      genre: "Religious",
      bookType: "printed",
      size: 500,
    };

    render(
      <BookProvider initialBooks={[existingBook]}>
        <BookForm initialBook={existingBook} onSubmitBook={onSubmitBook} />
      </BookProvider>,
    );

    // Click Update Book without changing ISBN
    await userEvent.click(screen.getByRole("button", { name: "Update Book" }));

    expect(onSubmitBook).toHaveBeenCalledTimes(1);
    expect(onSubmitBook).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "1",
        title: "Ramayana",
        isbn: "1234567890",
      }),
    );
  });
});

