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

    expect(screen.getByTestId("login-page-title")).toHaveTextContent(
      /Bienvenue sur la console d'administration Listing/i
    );
  });

  it("should render the error page", () => {
    render(
      <MemoryRouter initialEntries={["/listing-console/*"]}>
        <App />
      </MemoryRouter>
    );

    const linkElement = screen.getByText(/Retour accueil/i);
    expect(linkElement).toBeInTheDocument();
  });

  // it("should render first page: Login, without crashing", () => {
  //   // render(<App />, { wrapper: BrowserRouter });
  //   render(
  //     <MemoryRouter initialEntries={["/listing-console"]}>
  //       <Routes>
  //         <Route path="/listing-console" element={<Login />} />
  //         <Route path="/listing-console/home" element={<Index />} />
  //         <Route path="/listing-console/*" element={<Error />} />
  //       </Routes>
  //     </MemoryRouter>
  //   );

  // });

  // it("should render the error page", () => {
  //   render(
  //     <MemoryRouter initialEntries={["/listing-console//mauvaise-url"]}>
  //       <App />
  //     </MemoryRouter>
  //   );
  //   screen.debug();
  //   const linkElement = screen.getByText(/Retour accueil/i);
  //   expect(linkElement).toBeInTheDocument();
  // });
});
