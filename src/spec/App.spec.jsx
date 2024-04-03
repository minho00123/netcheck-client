import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import App from "../components/App";

describe("App component tests", () => {
  it('Home component should render at "/" route', () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText("Diagnose & Check")).toBeInTheDocument();
  });

  it('About component should render at "/about" route', () => {
    render(
      <MemoryRouter initialEntries={["/about"]}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText("Made by Min Ho Jang")).toBeInTheDocument();
  });

  it('Learn component should render at "/learn" route', () => {
    render(
      <MemoryRouter initialEntries={["/learn"]}>
        <App />
      </MemoryRouter>,
    );
    expect(screen.getByText("netcheck Features")).toBeInTheDocument();
  });

  it('Result component should render at "/result/:id" route', () => {
    render(
      <MemoryRouter initialEntries={["/result/123"]}>
        <App />
      </MemoryRouter>,
    );
    expect(
      screen.getByText("This is the network information of your website,"),
    ).toBeInTheDocument();
  });
});
