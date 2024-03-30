import { render, screen } from "@testing-library/react";
import Card from "../../components/Info/Card";

const mockIcon = ({ size }) => (
  <svg height={size} width={size} role="img">
    <rect width={size} height={size} />
  </svg>
);

describe("Card component tests", () => {
  const testTitle = "Test Title";

  it("Should render the icon and the title", () => {
    render(<Card Icon={mockIcon} title={testTitle} />);

    const iconElement = screen.getByRole("img");
    const titleElement = screen.getByText(testTitle);

    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveAttribute("height", "50");
    expect(iconElement).toHaveAttribute("width", "50");
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent(testTitle);
  });
});
