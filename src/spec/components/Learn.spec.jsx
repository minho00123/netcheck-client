import useStore from "../../store/store";
import { render, screen } from "@testing-library/react";
import { BrowserRouter, Navigate } from "react-router-dom";
import Learn from "../../components/Info/Learn";

vi.mock("react-router-dom", async importOriginal => {
  const actual = await importOriginal();

  return {
    ...actual,
    Navigate: vi.fn(),
  };
});

vi.mock("../../store/store.js", () => ({
  default: vi.fn(),
}));

describe("Learn component tests", () => {
  it("Should render properly", () => {
    useStore.mockImplementation(() => ({
      id: "123",
      url: "",
      setId: vi.fn(),
    }));

    render(
      <BrowserRouter>
        <Learn />
      </BrowserRouter>,
    );

    expect(screen.getByText("netcheck Features")).toBeInTheDocument();
  });

  it("Should redirect to /result/:id when the url exists", () => {
    useStore.mockImplementation(() => ({
      id: "123",
      url: "testUrl",
      setId: vi.fn(),
    }));

    render(
      <BrowserRouter>
        <Learn />
      </BrowserRouter>,
    );

    expect(Navigate).toHaveBeenCalledWith(
      {
        to: `/result/123`,
        replace: true,
      },
      expect.anything(),
    );
  });
});
