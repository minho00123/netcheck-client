import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import About from "../../components/Home/About";

describe("About component test", () => {
  it("Should render properly", () => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>,
    );

    expect(screen.getByText("Made by Min Ho Jang")).toBeInTheDocument();
    expect(screen.getByAltText("profile image")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });
});
