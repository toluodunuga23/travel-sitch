import { describe, it, expect, vi, beforeEach , afterEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Header } from "../Header";

describe("Header", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the header with logo and brand name", () => {
    render(<Header />);

    expect(screen.getByText("TravelSitch")).toBeInTheDocument();
    expect(screen.getByText("TS")).toBeInTheDocument();
  });
});
