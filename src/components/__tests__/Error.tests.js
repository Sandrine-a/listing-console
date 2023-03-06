/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";

import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import App from "../../views/App";

//Recreer la page erreur avant chaque test
const setup = () =>
  render(
    <MemoryRouter initialEntries={["/listing-console/*"]}>
      <App />
    </MemoryRouter>
  );

describe("Error integration testing", () => {
  it("should render title", () => {
    //First calling the setup function
    setup();

    //The test
    expect(screen.getByTestId("error-page-h1")).toHaveTextContent(
      /Oops! Cette page n'existe pas!/i
    );
  });

  it("should navigate to the login page", () => {
    //First calling the setup function
    setup();

    // verify page content for default route
    expect(screen.getByTestId("error-page-h1")).toHaveTextContent(
      /Oops! Cette page n'existe pas!/i
    );

    // verify page content for expected route after navigating
    fireEvent.click(screen.getByText(/Retour accueil/i));
    expect(screen.getByText(/Accéder à la console/i)).toBeInTheDocument();
  });
});
