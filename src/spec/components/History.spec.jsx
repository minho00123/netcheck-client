import axios from "axios";
import useStore from "../../store/store";
import { MemoryRouter } from "react-router-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import History from "../../components/Result/History";

vi.mock("axios");
vi.mock("../../store/store.js");

const mockData = {
  data: [
    {
      _id: "1",
      createdAt: "2020-01-01T10:00:00.000Z",
      serverRegion: "Seoul",
      reliabilityData: {
        statusCode: 200,
        responseTime: 15,
        lossRate: 0,
      },
      speedData: { averageLatency: 25, bandwidth: 150 },
    },
    {
      _id: "2",
      createdAt: "2020-01-02T10:00:00.000Z",
      serverRegion: "Virginia",
      reliabilityData: {
        statusCode: 200,
        responseTime: 10,
        lossRate: 0,
      },
      speedData: { averageLatency: 20, bandwidth: 100 },
    },
    {
      _id: "3",
      createdAt: "2020-01-03T10:00:00.000Z",
      serverRegion: "London",
      reliabilityData: {
        statusCode: 200,
        responseTime: 20,
        lossRate: 0,
      },
      speedData: { averageLatency: 30, bandwidth: 100 },
    },
  ],
};

describe("History component tests", () => {
  beforeEach(() => {
    useStore.mockReturnValue({ url: "testUrl" });

    axios.post.mockResolvedValue({ data: mockData.data });

    render(
      <MemoryRouter>
        <History />
      </MemoryRouter>,
    );
  });

  it("Should render properly", async () => {
    expect(await screen.findByText("No.")).toBeInTheDocument();
  });

  it("Should sort properly", async () => {
    axios.post.mockResolvedValue(mockData);

    await waitFor(() => {
      const regionElements = screen.getAllByText(/Seoul|Virginia/);
      expect(regionElements.length).toBeGreaterThanOrEqual(2);
    });

    fireEvent.change(screen.getByDisplayValue("↑ Asc."), {
      target: { value: "desc" },
    });

    await waitFor(() => {
      const dates = screen.getAllByText(/2020/).map(node => node.textContent);
      expect(dates).toEqual(
        expect.arrayContaining(["01/02/2020, 19:00", "01/01/2020, 19:00"]),
      );
    });
  });

  it("Should filter data based on selected region", async () => {
    fireEvent.change(screen.getByDisplayValue("All"), {
      target: { value: "Virginia" },
    });

    await waitFor(() => {
      const tableBody = screen.getByRole("table").querySelector("tbody");

      expect(tableBody).toHaveTextContent("Virginia");
      expect(tableBody).not.toHaveTextContent("Seoul");
    });
  });
});
