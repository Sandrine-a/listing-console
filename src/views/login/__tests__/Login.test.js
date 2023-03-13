/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";

import {
  act,
  fireEvent,
  getByRole,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../Login";

import userEvent from "@testing-library/user-event";
import { globalStore, handleSubmit, logUser } from "../../../store/globalStore";

// import axios from "axios";

// jest.mock(axios);

//Recreer la page login avant chaque test
const setup = () => {
  render(<Login />, { wrapper: MemoryRouter });
};

describe("Login Integration Test Suite", () => {
  it("should render the Login Page with title", () => {
    //First calling the setup function
    setup();

    expect(screen.getByTestId("login-page-title")).toHaveTextContent(
      /Bienvenue sur la console d'administration Listing/i
    );
    // screen.debug();
  });

  it("should have an <img /> with the alt attribute", () => {
    //First calling the setup function
    setup();

    const image = screen.getByAltText("Logo application Listing");
    expect(image).toBeInTheDocument();
  });

  it("should render an input for email", () => {
    //First calling the setup function
    setup();
    const emailInputEl = screen.getByPlaceholderText(/Entrer le mail/i);
    expect(emailInputEl).toBeInTheDocument();
    // expect(emailInputEl).toBeTruthy();
  });

  it("should have render an input for password", () => {
    //First calling the setup function
    setup();

    const passwordInputEl = screen.getByPlaceholderText(
      /Entrer le mot de passe/i
    );
    expect(passwordInputEl).toBeInTheDocument();
  });

  it("should have an input button with the correct label Se connecter", () => {
    //First calling the setup function
    setup();

    const buttonEl = screen.getByRole("button", { name: "Se connecter" });
    expect(buttonEl).toBeInTheDocument();
  });

  /**
   * Verification de la valeur de l'input email
   */
  it("should be empty for emailInput", () => {
    //First calling the setup function
    setup();

    const emailInputEl = screen.getByPlaceholderText(/Entrer le mail/i);
    expect(emailInputEl.value).toBe("");
  });

  /**
   * Verification de la valeur de l'input paswword
   */
  it("should be empty for passwordInput", () => {
    //First calling the setup function
    setup();

    const passwordInputEl = screen.getByPlaceholderText(
      /Entrer le mot de passe/i
    );
    expect(passwordInputEl.value).toBe("");
  });

  /**
   * Verification de la valeur de l'input email change
   */
  it("should change the email input value", () => {
    //First calling the setup function
    setup();

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
    //First calling the setup function
    setup();

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
   * Verification l'affichage du message d'erreur de email et password
   */
  it("should display an error message for the email and password input after submit, when they are empty", async () => {
    //First calling the setup function
    setup();

    //Cible le bouton qui appelle la fonction handleLogin()
    const buttonEl = screen.getByRole("button", { name: "Se connecter" });
    //Cible la div qui contient le message d'erreur email
    const emailErrorMessage = screen.getByTestId("user-email-error-msg");
    //Cible la div qui contient le message d'erreur email
    const passwordErrorMessage = screen.getByTestId("user-password-error-msg");

    //Les changements de state doivent entre mis dans act()
    act(() => {
      globalStore.set({
        email: "",
        password: "",
        loading: false,
        errors: {},
      });

      fireEvent.click(buttonEl);

      globalStore.setKey("loading", true);
    });

    await waitFor(() =>
      expect(emailErrorMessage).toHaveTextContent(
        "Merci de rentrer une adresse email"
      )
    );

    await waitFor(() =>
      expect(passwordErrorMessage).toHaveTextContent(
        "Merci de rentrer le mot de passe"
      )
    );
  });

  /**
   * Verification l'affichage du message d'erreur de password
   */
  it("should display an error message for password input after submit, when password is empty", async () => {
    //First calling the setup function
    setup();
    //Cible le bouton qui appelle la fonction handleLogin()
    const buttonEl = screen.getByRole("button", { name: "Se connecter" });
    //Cible la div qui contient le message d'erreur email
    const emailErrorMessage = screen.getByTestId("user-email-error-msg");
    //Cible la div qui contient le message d'erreur email
    const passwordErrorMessage = screen.getByTestId("user-password-error-msg");

    //Les changements de state doivent entre mis dans act()
    act(() => {
      globalStore.set({
        email: "",
        password: "",
        loading: false,
        errors: {},
      });

      globalStore.setKey("email", "test");

      fireEvent.click(buttonEl);

      globalStore.setKey("loading", true);
    });

    await waitFor(() =>
      expect(emailErrorMessage).not.toHaveTextContent(
        "Merci de rentrer une adresse email"
      )
    );

    await waitFor(() =>
      expect(passwordErrorMessage).toHaveTextContent(
        "Merci de rentrer le mot de passe"
      )
    );
  });

  it("should call handleSubmit function", async () => {
    //First, create the mock of the handleSubmit
    const handleSubmit = jest.fn();
    //And mock for
    const e = { preventDefault: jest.fn() };

    // Mock la fonction logUser
    // globalStore.logUser = logUser;
    globalStore.handleSubmit = handleSubmit;

    const navigate = jest.fn();

    //Passer le handleSubmit mock au component
    render(<Login handleSubmit={handleSubmit(e, navigate)} />, {
      wrapper: MemoryRouter,
    });

    await act(async () => {
      await fireEvent.click(
        screen.getByRole("button", { name: "Se connecter" })
      );
    });

    expect(handleSubmit).toHaveBeenCalled();

    expect(handleSubmit).not.toHaveBeenCalledTimes(2);

    // screen.debug();
  });
});
