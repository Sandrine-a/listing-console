import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../../App";
import Login, { sum } from "../Login";

describe("First unit test sum", () => {
  //Test Unit for function: Sum
  it("Should return 20", () => {
    const result = sum(10, 10);

    expect(result).toEqual(20);

    //Ou plus simplement:
    // expect(sum(10, 10)).toBe(20);
  });
});

describe("Login Integration Test Suite", () => {
  it("should render the Login Page with title", () => {
    render(<Login />, { wrapper: MemoryRouter });
    expect(screen.getByTestId("login-page-title")).toHaveTextContent(
      /Bienvenue sur la console d'administration Listing/i
    );
    // screen.debug();
  });

  it("should have an <img /> with the alt attribute", () => {
    render(<Login />, { wrapper: MemoryRouter });

    const image = screen.getByAltText("Logo application Listing");
    expect(image).toBeInTheDocument();
  });

  it("should have render an input for email", () => {
    render(<Login />, { wrapper: MemoryRouter });
    const emailInputEl = screen.getByPlaceholderText(/Entrer le mail/i);
    expect(emailInputEl).toBeInTheDocument();
  });

  it("should have render an input for password", () => {
    render(<Login />, { wrapper: MemoryRouter });
    const passwordInputEl = screen.getByPlaceholderText(
      /Entrer le mot de passe/i
    );
    expect(passwordInputEl).toBeInTheDocument();
  });

  it("should have an input button", () => {
    render(<Login />, { wrapper: MemoryRouter });
    const buttonEl = screen.getByRole("button");
    expect(buttonEl).toBeInTheDocument();
  });

  /**
   * Verification de la valeur de l'input email
   */
  it("should be be empty for emailInput", () => {
    render(<Login />, { wrapper: MemoryRouter });
    const emailInputEl = screen.getByPlaceholderText(/Entrer le mail/i);
    expect(emailInputEl.value).toBe("");
  });

  /**
   * Verification de la valeur de l'input paswword
   */
  it("should be be empty for passwordInput", () => {
    render(<Login />, { wrapper: MemoryRouter });
    const passwordInputEl = screen.getByPlaceholderText(
      /Entrer le mot de passe/i
    );
    expect(passwordInputEl.value).toBe("");
  });

  /**
   * Verification de la valeur de l'input email change
   */
  it("should change the email input value", () => {
    render(<Login />, { wrapper: MemoryRouter });
    const emailInputEl = screen.getByPlaceholderText(/Entrer le mail/i);

    //Je cree ma nouvelle valeur test
    const testValue = "test";
    //Je cree  l'evenement onchange
    fireEvent.change(emailInputEl, { target: { value: testValue } });
    //Je test le resutat du change pour voir s'il correspond bien
    expect(emailInputEl.value).toBe(testValue);
  });

  /**
   * Verification de la valeur de l'input password change
   */
  it("should change the password input value", () => {
    render(<Login />, { wrapper: MemoryRouter });
    const passwordInputEl = screen.getByPlaceholderText(
      /Entrer le mot de passe/i
    );

    //Je cree ma nouvelle valeur test
    const testValue = "password";
    //Je cree  l'evenement onchange
    fireEvent.change(passwordInputEl, { target: { value: testValue } });
    //Je test le resutat du change pour voir s'il correspond bien
    expect(passwordInputEl.value).toBe(testValue);
  });

  /**
   * Verification l'affichage des messages d'erreur
   */
});
