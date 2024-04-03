import useStore from "../../store/store";
import { render, screen } from "@testing-library/react";
import Total from "../../components/Result/Total";

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
    speedData: {
      minLatency: 10,
      maxLatency: 20,
      averageLatency: 15,
      bandwidth: 100,
    },
  },
  virginiaData: {
    reliabilityData: {
      statusCode: 203,
      responseTime: 100,
      lossRate: 10,
      sent: 10,
      received: 9,
    },
    speedData: {
      minLatency: 10,
      maxLatency: 30,
      averageLatency: 20,
      bandwidth: 80,
    },
  },
  londonData: {
    reliabilityData: {
      statusCode: 500,
      responseTime: 200,
      lossRate: 100,
      sent: 0,
      received: 0,
    },
    speedData: {
      minLatency: 150,
      maxLatency: 300,
      averageLatency: 225,
      bandwidth: 10,
    },
  },
};

describe("Total component tests", () => {
  it("Should render properly", () => {
    useStore.mockReturnValue(mockData);

    render(<Total />);

    expect(screen.getByText("200")).toBeInTheDocument();
    expect(screen.getByText("203")).toBeInTheDocument();
    expect(screen.getByText("500")).toBeInTheDocument();
    expect(screen.getByText("123 ms")).toBeInTheDocument();
    expect(screen.getByText("100 ms")).toBeInTheDocument();
    expect(screen.getByText("200 ms")).toBeInTheDocument();
    expect(screen.getByText("0%")).toBeInTheDocument();
    expect(screen.getByText("10%")).toBeInTheDocument();
    expect(screen.getByText("100%")).toBeInTheDocument();
    expect(screen.getByText("Sent: 10 / Received: 10")).toBeInTheDocument();
    expect(screen.getByText("Sent: 10 / Received: 9")).toBeInTheDocument();
    expect(screen.getByText("Sent: 0 / Received: 0")).toBeInTheDocument();
    expect(screen.getByText("100").nextSibling.textContent).toContain("Mbit/s");
    expect(screen.getByText("80").nextSibling.textContent).toContain("Mbit/s");
    expect(screen.getByText("10").nextSibling.textContent).toContain("Mbit/s");
  });
});
