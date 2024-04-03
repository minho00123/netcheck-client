import { MemoryRouter, Routes, Route } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../../components/Home/Home";

vi.mock("../../store/store.js", () => {
  const setId = vi.fn();

  return {
    default: () => ({
      id: "123",
      url: null,
      setId,
    }),
  };
});

describe("Home component tests", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/learn" element={<div>Learn page</div>} />
        </Routes>
      </MemoryRouter>,
    );
  });

  it("Should render properly", () => {
    expect(screen.getByText("Diagnose & Check")).toBeInTheDocument();
    expect(screen.getByText("your website")).toBeInTheDocument();
  });

  it("Should go to /learn when clicking the 'Learn more' button", () => {
    const learnMoreButton = screen.getByRole("link", { name: "Learn more" });

    fireEvent.click(learnMoreButton);

    expect(screen.getByText("Learn page")).toBeInTheDocument();
  });
});
