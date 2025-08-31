import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ErrorState from "./ErrorState";

describe("ErrorState", () => {
  it("renders message and calls retry", () => {
    const onRetry = vi.fn();
    render(<ErrorState message="Oops" onRetry={onRetry} />);
    expect(screen.getByRole("alert")).toHaveTextContent("Oops");
    fireEvent.click(screen.getByRole("button", { name: /retry/i }));
    expect(onRetry).toHaveBeenCalled();
  });
});
