import useStore from "../../store/store";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Learn from "../../components/Info/Learn";

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
      <MemoryRouter>
        <Learn />
      </MemoryRouter>,
    );

    expect(screen.getByText("netcheck Features")).toBeInTheDocument();
  });
});
