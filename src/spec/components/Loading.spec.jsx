import { render, screen } from "@testing-library/react";
import Loading from "../../components/Common/Loading";

describe("Loading component tests", () => {
  const testText = "Loading...";

  beforeEach(() => {
    render(<Loading text={testText} />);
  });

  it("Should render the text correctly", async () => {
    expect(screen.getByText(testText)).toBeInTheDocument();
  });

  it("Should render the loading spinner", () => {
    const spinnerElement = document.querySelector(".animate-spin");

    expect(spinnerElement).toBeInTheDocument();
  });
});
