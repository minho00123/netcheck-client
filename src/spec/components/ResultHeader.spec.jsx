import { BrowserRouter } from "react-router-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "../../components/Result/Header";

describe("Result Header component tests", () => {
  const renderingComponent = (
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );

  it("Should render properly", () => {
    render(renderingComponent);

    expect(screen.getByText("Share")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  it("Should show a modal when the Share button is clicked", async () => {
    render(renderingComponent);

    const shareButton = screen.getByText("Share");

    expect(
      screen.queryByText("Share with your friends"),
    ).not.toBeInTheDocument();
    fireEvent.click(shareButton);
    expect(screen.queryByText("Share with your friends")).toBeInTheDocument();
  });

  it("Should navigate to About page when the About button is clicked", async () => {
    render(renderingComponent);

    const aboutButton = screen.getByText("About");

    fireEvent.click(aboutButton);
    expect(window.location.pathname).toBe("/about");
  });
});
