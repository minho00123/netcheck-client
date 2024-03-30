import { BrowserRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
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
  const renderingComponent = (
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );

  it("Should render properly", async () => {
    render(renderingComponent);

    await waitFor(() => {
      expect(screen.getByText("Diagnose & Check")).toBeInTheDocument();
      expect(screen.getByText("your website")).toBeInTheDocument();
    });
  });
});
