import useStore from "../../store/store";
import { BrowserRouter } from "react-router-dom";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Sidebar from "../../components/Common/Sidebar";

vi.mock("../../store/store.js", () => {
  return {
    default: vi.fn(),
  };
});

describe("Sidebar component tests", () => {
  const setUrl = vi.fn();
  const setSelectedRegion = vi.fn(() => Promise.resolve());

  beforeEach(() => {
    setUrl.mockClear();
    setSelectedRegion.mockClear();
    useStore.mockImplementation(() => ({
      setUrl,
      selectedRegion: "Seoul",
      setSelectedRegion,
    }));
  });

  const renderingComponent = (
    <BrowserRouter>
      <Sidebar />
    </BrowserRouter>
  );

  it("Should render properly", async () => {
    render(renderingComponent);

    expect(screen.getByText("North East Asia (Seoul)")).toBeInTheDocument();
    expect(screen.getByText("US - East (Virginia)")).toBeInTheDocument();
    expect(screen.getByText("Europe (London)")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("History")).toBeInTheDocument();
  });

  it("Should handle selected region buttons", async () => {
    render(renderingComponent);

    const seoulButton = screen.getByText("North East Asia (Seoul)");
    const virginiaButton = screen.getByText("US - East (Virginia)");
    const londonButton = screen.getByText("Europe (London)");
    const totalButton = screen.getByText("Total");
    const historyButton = screen.getByText("History");

    fireEvent.click(seoulButton);
    await waitFor(() =>
      expect(setSelectedRegion).toHaveBeenCalledWith("Seoul"),
    );

    fireEvent.click(virginiaButton);
    await waitFor(() => {
      expect(setSelectedRegion).toHaveBeenCalledWith("Virginia");
    });

    fireEvent.click(londonButton);
    await waitFor(() => {
      expect(setSelectedRegion).toHaveBeenCalledWith("London");
    });

    fireEvent.click(totalButton);
    await waitFor(() => {
      expect(setSelectedRegion).toHaveBeenCalledWith("Total");
    });

    fireEvent.click(historyButton);
    await waitFor(() => {
      expect(setSelectedRegion).toHaveBeenCalledWith("History");
    });
  });

  it("Should handle logo", async () => {
    render(renderingComponent);

    const logo = screen.getByAltText("logo");

    fireEvent.click(logo);
    await waitFor(() => {
      expect(setUrl).toHaveBeenCalledWith("");
      expect(setSelectedRegion).toHaveBeenCalledWith("Seoul");
    });
  });
});
