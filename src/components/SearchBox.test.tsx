import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBox from "./SearchBox";

const results = [
  { name: "Montreal", country: "CA", latitude: 45, longitude: -73 },
  { name: "Montréal", country: "CA", latitude: 45, longitude: -73 },
];

describe("SearchBox", () => {
  it("calls setQuery on typing and shows results", () => {
    const setQuery = vi.fn();
    render(
      <SearchBox
        query=""
        setQuery={setQuery}
        results={results}
        status="ready"
        canSearch={true}
        onSelect={() => {}}
      />
    );
    const input = screen.getByRole("combobox");
    fireEvent.change(input, { target: { value: "Mon" } });
    expect(setQuery).toHaveBeenCalledWith("Mon");
    // results listbox present
    expect(screen.getByRole("listbox")).toBeInTheDocument();
    expect(screen.getAllByRole("option").length).toBe(2);
  });

  it("keyboard navigation + enter selects active item", () => {
    const onSelect = vi.fn();
    const setQuery = vi.fn();
    render(
      <SearchBox
        query="Mon"
        setQuery={setQuery}
        results={results}
        status="ready"
        canSearch={true}
        onSelect={onSelect}
      />
    );
    const input = screen.getByRole("combobox");
    fireEvent.focus(input);
    fireEvent.keyDown(input, { key: "ArrowDown" });
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onSelect).toHaveBeenCalledWith(results[0]);
  });
});
