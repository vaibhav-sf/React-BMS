import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GenreFilter from "./GenreFilter";

describe("GenreFilter", () => {
  test("renders select dropdown with all options", () => {
    render(<GenreFilter selectedGenre="" onGenreChange={vi.fn()} />);

    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
    expect(screen.getByText("All Genres")).toBeInTheDocument();
    expect(screen.getByText("Religious")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
  });

  test("triggers onGenreChange when a genre is selected", async () => {
    const onGenreChange = vi.fn();
    render(<GenreFilter selectedGenre="" onGenreChange={onGenreChange} />);

    const select = screen.getByRole("combobox");
    await userEvent.selectOptions(select, "Action");

    expect(onGenreChange).toHaveBeenCalledWith("Action");
  });
});
