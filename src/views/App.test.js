/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import { MemoryRouter /* BrowserRouter, */ } from "react-router-dom";
import App from "./App";

describe("Router integration Test Suites", () => {
  it("should render first page: Login, without crashing", () => {
    // render(<App />, { wrapper: BrowserRouter });

    render(
      <MemoryRouter initialEntries={["/listing-console/"]}>
        <App />
      </MemoryRouter>
    );
    // screen.debug();
  });

  it("should render the error page", () => {
    render(
      <MemoryRouter initialEntries={["/listing-console/*"]}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByTestId("error-page-h1")).toHaveTextContent(
      /Oopss! Cette page n'existe pas!/i
    );
    // screen.debug();
  });
});
