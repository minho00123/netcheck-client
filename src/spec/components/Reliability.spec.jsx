import useStore from "../../store/store";
import { render, screen, within } from "@testing-library/react";
import Reliability from "../../components/Result/Reliability";

vi.mock("../../store/store.js");

const mockData = {
  seoulData: {
    reliabilityData: {
      statusCode: 200,
      responseTime: 123,
      lossRate: 0,
      sent: 10,
      received: 10,
    },
  },
  virginiaData: {
    reliabilityData: {
      statusCode: 500,
      responseTime: 200,
      lossRate: 10,
      sent: 10,
      received: 9,
    },
  },
  londonData: {
    reliabilityData: {
      statusCode: 200,
      responseTime: 100,
      lossRate: 20,
      sent: 10,
      received: 8,
    },
  },
  selectedRegion: "Seoul",
};

describe("Reliability component tests", () => {
  beforeEach(() => {
    useStore.mockReturnValue(mockData);
  });

  it("Should display reliability data for the selected region", () => {
    render(<Reliability />);

    expect(screen.getByText("200")).toBeInTheDocument();
    expect(screen.getByText("OK")).toBeInTheDocument();
    expect(screen.getByText("123 ms")).toBeInTheDocument();
    expect(screen.getByText("0%")).toBeInTheDocument();
    expect(screen.getByText("Sent: 10 / Received: 10")).toBeInTheDocument();
  });

  it("Should update the reliability data when the selected region changes", () => {
    useStore.mockReturnValue({ ...mockData, selectedRegion: "Virginia" });
    render(<Reliability />);

    expect(screen.getByText("500")).toBeInTheDocument();
    expect(screen.getByText("Error")).toBeInTheDocument();
    expect(screen.getByText("200 ms")).toBeInTheDocument();
    expect(screen.getByText(/10%/)).toBeInTheDocument();
    expect(screen.getByText("Sent: 10 / Received: 9")).toBeInTheDocument();
  });

  it("Should show an appropriate status message based on the status code", () => {
    render(<Reliability />);

    const statusParagraph = screen.getByText(/200/).closest("p");
    const statusSpan = within(statusParagraph).getByText("OK");

    expect(statusSpan).toHaveClass("text-green");

    useStore.mockReturnValue({ ...mockData, selectedRegion: "Virginia" });
    render(<Reliability />);

    const errorStatusParagraph = screen.getByText(/500/).closest("p");
    const errorStatusSpan = within(errorStatusParagraph).getByText("Error");

    expect(errorStatusSpan).toHaveClass("text-red");
  });
});
