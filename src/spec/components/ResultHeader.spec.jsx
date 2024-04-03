import { MemoryRouter, Routes, Route } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../../components/Result/Header";

describe("Result Header component tests", () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/about" element={<h1>About Page</h1>} />
        </Routes>
      </MemoryRouter>,
    );
  });

  it("Should render properly", () => {
    expect(screen.getByText("Share")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  it("Should show a modal when the Share button is clicked", async () => {
    const shareButton = screen.getByText("Share");

    fireEvent.click(shareButton);

    expect(screen.getByText("Share with your friends")).toBeInTheDocument();
  });

  it("Should navigate to About page when the About button is clicked", async () => {
    const aboutButton = screen.getByText("About");

    fireEvent.click(aboutButton);

    expect(screen.getByText("About Page")).toBeInTheDocument();
  });
});
