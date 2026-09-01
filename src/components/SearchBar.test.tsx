import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar";

describe("SearchBar", () => {
  test("renders input with provided search query", () => {
    render(<SearchBar searchQuery="Ramayana" onSearchChange={vi.fn()} />);

    const input = screen.getByPlaceholderText("Search by title or author");
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue("Ramayana");
  });

  test("triggers onSearchChange when user types in search input", async () => {
    const onSearchChange = vi.fn();
    render(<SearchBar searchQuery="" onSearchChange={onSearchChange} />);

    const input = screen.getByPlaceholderText("Search by title or author");
    await userEvent.type(input, "Valmiki");

    expect(onSearchChange).toHaveBeenCalled();
  });
});
