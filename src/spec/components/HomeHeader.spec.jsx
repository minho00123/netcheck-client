import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../../components/Home/Header";

describe("Home Header component tests", () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/about" element={<div>About Page</div>} />
        </Routes>
      </MemoryRouter>,
    );
  });

  it("Should render properly", () => {
    const logoImage = screen.getByAltText("logo");
    const aboutLink = screen.getByRole("link", { name: "About" });

    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute(
      "src",
      expect.stringContaining("logo.png"),
    );
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink.closest("a")).toHaveAttribute("href", "/about");
  });

  it("Should go to home when clicking the logo", () => {
    const logo = screen.getByAltText("logo");

    fireEvent.click(logo);

    expect(window.location.pathname).toBe("/");
  });

  it("Should go to /about when clicking the About button", () => {
    const aboutButton = screen.getByRole("link", { name: "About" });

    fireEvent.click(aboutButton);

    expect(screen.getByText("About Page")).toBeInTheDocument();
  });
});
