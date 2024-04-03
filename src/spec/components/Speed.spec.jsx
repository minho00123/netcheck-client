import useStore from "../../store/store";
import { render, screen } from "@testing-library/react";
import Speed from "../../components/Result/Speed";

vi.mock("../../store/store.js");

const mockData = {
  seoulData: {
    speedData: {
      minLatency: 10,
      maxLatency: 20,
      averageLatency: 15,
      bandwidth: 100,
    },
  },
  virginiaData: {
    speedData: {
      minLatency: "",
      maxLatency: "",
      averageLatency: "",
      bandwidth: "",
    },
  },
  londonData: {
    speedData: {
      minLatency: 20,
      maxLatency: 30,
      averageLatency: 25,
      bandwidth: 200,
    },
  },
  selectedRegion: "Seoul",
};

describe("Speed component tests", () => {
  it("Should render speed information for Seoul", () => {
    useStore.mockReturnValue(mockData);

    render(<Speed />);

    expect(screen.getByText(/min:/).nextSibling.textContent).toContain(10);
    expect(screen.getByText(/max:/).nextSibling.textContent).toContain(20);
    expect(screen.getByText(/average:/).nextSibling.textContent).toContain(15);
    expect(screen.getByText("100").nextSibling.textContent).toContain("Mbit/s");
  });

  it("Should render nothing when data is not provided", () => {
    useStore.mockReturnValue({
      ...mockData,
      selectedRegion: "Virginia",
    });

    render(<Speed />);

    expect(screen.getByText(/min:/).nextSibling.textContent).toContain("");
    expect(screen.getByText(/max:/).nextSibling.textContent).toContain("");
    expect(screen.getByText(/average:/).nextSibling.textContent).toContain("");
  });
});
