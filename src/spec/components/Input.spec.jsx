import { MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Input from "../../components/Common/Input";

vi.mock("../../store/store.js", () => {
  return {
    default: vi.fn(() => ({
      setUrl: vi.fn(),
      resetData: vi.fn(),
      setId: vi.fn(),
    })),
  };
});

describe("Input component tests", () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Input />
      </MemoryRouter>,
    );
  });

  it("Should render properly", async () => {
    const inputPlaceholder = await screen.findByPlaceholderText(
      "Write the URL here (ex. https://www.example.com)",
    );

    expect(inputPlaceholder).toBeInTheDocument();
  });

  it("Should show a warning message for an invalid URL", async () => {
    const inputPlaceholder = await screen.findByPlaceholderText(
      "Write the URL here (ex. https://www.example.com)",
    );

    fireEvent.change(inputPlaceholder, { target: { value: "example.com" } });
    fireEvent.click(screen.getByRole("button"));

    const warningText = await screen.findByText(
      "Please write the url in correct form (Ex. https://www.example.com)",
    );

    expect(warningText).toBeInTheDocument();
  });

  it("Should not show a warning message for a vaild URL", async () => {
    const inputPlaceholder = await screen.findByPlaceholderText(
      "Write the URL here (ex. https://www.example.com)",
    );

    fireEvent.change(inputPlaceholder, {
      target: { value: "https://www.example.com" },
    });

    const warningText = screen.queryByText(
      "Please write the url in correct form (Ex. https://www.example.com)",
    );

    expect(warningText).toBeNull();
  });

  it("Should clear the input value after submission", async () => {
    const inputPlaceholder = await screen.findByPlaceholderText(
      "Write the URL here (ex. https://www.example.com)",
    );

    fireEvent.change(inputPlaceholder, {
      target: { value: "https://www.example.com" },
    });
    fireEvent.click(screen.getByRole("button"));

    expect(inputPlaceholder.value).toBe("");
  });
});
