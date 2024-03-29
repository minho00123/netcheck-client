import { render, screen } from "@testing-library/react";
import Loading from "../../components/Common/Loading";

describe("Loading component tests", () => {
  const testText = "Loading...";
  it("Should render the text correctly", async () => {
    render(<Loading text={testText} />);

    expect(screen.getByText(testText)).toBeInTheDocument();
  });

  it("Should render the loading spinner", () => {
    render(<Loading text={testText} />);

    const spinnerElement = document.querySelector(".animate-spin");

    expect(spinnerElement).toBeInTheDocument();
  });
});
