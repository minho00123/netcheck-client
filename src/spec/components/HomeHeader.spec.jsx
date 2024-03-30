import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import Header from "../../components/Home/Header";
import { expect } from "vitest";

describe("Home Header component tests", () => {
  it("Should render properly", () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

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
});
