import useStore from "../../store/store";
import { render, screen } from "@testing-library/react";
import Information from "../../components/Result/Information";

vi.mock("../../store/store.js");

const mockData = {
  seoulData: {
    informationData: {
      registrar: "Seoul Registrar",
      registerExpiryDate: "2023-01-01",
      ipAddress: "192.0.2.1",
      city: "Seoul",
      country: "South Korea",
    },
  },
  virginiaData: {
    informationData: {
      registrar: "Virginia Registrar",
      registerExpiryDate: "2024-01-01",
      ipAddress: "198.51.100.1",
      city: "Ashburn",
      country: "USA",
    },
  },
  londonData: {},
  selectedRegion: "Seoul",
};

describe("Information component tests", () => {
  it("Should display information based on the selected region", () => {
    useStore.mockReturnValue(mockData);

    render(<Information />);

    expect(screen.getByText(/Registrar:/)).toBeInTheDocument();
    expect(screen.getByText("Seoul Registrar")).toBeInTheDocument();
    expect(screen.getByText("2023-01-01")).toBeInTheDocument();
    expect(screen.getByText("192.0.2.1")).toBeInTheDocument();
    expect(screen.getByText(/Seoul, South Korea/)).toBeInTheDocument();
  });

  it("Should update information when the selected region changes", () => {
    useStore.mockReturnValue({ ...mockData, selectedRegion: "Virginia" });

    render(<Information />);

    expect(screen.getByText("Virginia Registrar")).toBeInTheDocument();
    expect(screen.getByText("198.51.100.1")).toBeInTheDocument();
    expect(screen.getByText(/Ashburn, USA/)).toBeInTheDocument();
  });

  it("should not crash and display nothing if informationData is missing", () => {
    useStore.mockReturnValue({
      ...mockData,
      selectedRegion: "London",
    });

    render(<Information />);

    expect(screen.queryByText("Domain")).toBeNull();
    expect(screen.queryByText(/Registrar:/)).toBeNull();
    expect(screen.queryByText(/IP Address/)).toBeNull();
  });
});
