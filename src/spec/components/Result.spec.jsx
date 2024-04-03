import axios from "axios";
import useStore from "../../store/store";
import { MemoryRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import Result from "../../components/Result/Result";

vi.mock("axios");
vi.mock("../../store/store.js");
vi.mock("react-router-dom", async importOriginal => {
  const originalModule = await importOriginal();

  return {
    ...originalModule,
    Link: ({ children, to }) => <a href={to}>{children}</a>,
  };
});

describe("Result component tests", () => {
  beforeEach(() => {
    useStore.mockReturnValue({
      url: "https://www.example.com",
      seoulData: {},
      londonData: {},
      virginiaData: {},
      selectedRegion: "Seoul",
      setUrl: vi.fn(),
      setSeoulData: vi.fn(),
      setLondonData: vi.fn(),
      setVirginiaData: vi.fn(),
    });

    axios.post.mockResolvedValue({
      data: [
        {
          url: "https://www.example.com",
          serverRegion: "Seoul",
          tracerouteData: [],
        },
      ],
    });

    render(
      <MemoryRouter>
        <Result />
      </MemoryRouter>,
    );
  });

  it("Should render Header component", () => {
    expect(screen.getByText("Share")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  it("Should render properly and calls API", async () => {
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
    });

    expect(screen.getByText("Getting the data")).toBeInTheDocument();
  });

  it("Should display website address", async () => {
    const networkInfoElement = screen.getByTestId("network-info");

    expect(networkInfoElement.textContent).toMatch(
      /This is the network information of your website, https:\/\/www\.example\.com/,
    );
  });
});
