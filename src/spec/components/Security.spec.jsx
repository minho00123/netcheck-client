import useStore from "../../store/store";
import { render, screen } from "@testing-library/react";
import Security from "../../components/Result/Security";

vi.mock("../../store/store.js");

const mockData = {
  seoulData: {
    securityData: {
      issuer: "Seoul Issuer",
      expiryDate: "2023-01-01",
      csp: "default-src self",
      hsts: "max-age=63072000; includeSubDomains",
    },
  },
  virginiaData: {
    securityData: {
      issuer: "",
      expiryDate: "",
      csp: "",
      hsts: "",
    },
  },
  londonData: {
    securityData: {},
  },
  selectedRegion: "Seoul",
};

describe("Security component tests", () => {
  beforeEach(() => {
    useStore.mockReturnValue(mockData);
  });

  it("renders security information for the selected region", () => {
    render(<Security />);

    const issuerElement = screen.getByText(/Issuer:/);
    const expiryDate = screen.getByText(/Expiry Date:/);
    const csp = screen.getByText(/CSP:/);
    const hsts = screen.getByText(/HSTS:/);

    expect(issuerElement.nextSibling.textContent).toEqual("Seoul Issuer");
    expect(expiryDate.nextSibling.textContent).toEqual("2023-01-01");
    expect(csp.nextSibling.textContent).toEqual("default-src self");
    expect(hsts.nextSibling.textContent).toEqual(
      "max-age=63072000; includeSubDomains",
    );
  });

  it("Should render nothing when data is not provided", () => {
    useStore.mockReturnValue({
      ...mockData,
      selectedRegion: "Virginia",
    });

    render(<Security />);

    const issuerLabel = screen.getByText(/Issuer:/);
    let issuerValue = issuerLabel.nextSibling
      ? issuerLabel.nextSibling.textContent
      : "";
    const expiryDateLabel = screen.getByText(/Expiry Date:/);
    let expiryDateValue = expiryDateLabel.nextSibling
      ? expiryDateLabel.nextSibling.textContent
      : "";
    const cspLabel = screen.getByText(/CSP:/);
    let cspValue = cspLabel.nextSibling
      ? cspLabel.nextSibling.textContent
      : "none";
    const hstsLabel = screen.getByText(/HSTS:/);
    let hstsValue = hstsLabel.nextSibling
      ? hstsLabel.nextSibling.textContent
      : "none";

    expect(issuerValue).toEqual("");
    expect(expiryDateValue).toEqual("");
    expect(cspValue).toEqual("none");
    expect(hstsValue).toEqual("none");
  });
});
