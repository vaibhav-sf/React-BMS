import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ConfirmModal from "./ConfirmModal";

describe("ConfirmModal", () => {
  test("does not render when isOpen is false", () => {
    render(
      <ConfirmModal
        isOpen={false}
        message="Are you sure?"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />
    );

    expect(screen.queryByText("Are you sure?")).not.toBeInTheDocument();
  });

  test("renders title and message when isOpen is true", () => {
    render(
      <ConfirmModal
        isOpen={true}
        title="Delete Item"
        message="Are you sure you want to delete?"
        onConfirm={vi.fn()}
        onCancel={vi.fn()}
      />
    );

    expect(screen.getByText("Delete Item")).toBeInTheDocument();
    expect(screen.getByText("Are you sure you want to delete?")).toBeInTheDocument();
  });

  test("calls onCancel when Cancel button is clicked", async () => {
    const onCancel = vi.fn();
    render(
      <ConfirmModal
        isOpen={true}
        message="Confirm action"
        onConfirm={vi.fn()}
        onCancel={onCancel}
      />
    );

    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(onCancel).toHaveBeenCalledTimes(1);
  });

  test("calls onConfirm when Delete button is clicked", async () => {
    const onConfirm = vi.fn();
    render(
      <ConfirmModal
        isOpen={true}
        message="Confirm action"
        onConfirm={onConfirm}
        onCancel={vi.fn()}
      />
    );

    await userEvent.click(screen.getByRole("button", { name: "Delete" }));

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});
