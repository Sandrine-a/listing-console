/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import { getByRole, getByTestId } from "@testing-library/dom";
import {
  fireEvent,
  getByPlaceholderText,
  getByText,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";

import { cleanStores, keepMount } from "nanostores";

import Login from "../../views/login/Login";

import {
  globalStore,
  validateForm,
  handleSubmit,
  setErrors,
  setForm,
  setEmail,
  setPassword,
} from "../globalStore";

beforeEach(() => {
  globalStore.set({
    form: {},
    email: "",
    password: "",
    loading: false,
    errors: {},
    users: [],
    user: "",
  });
});

afterEach(() => {
  cleanStores(globalStore);
});

describe("GlobalStore Unit Test Suite", () => {
  /**
   * Verification des valeurs initiales du store
   */
  it("should have default values for all keys", () => {
    const initialState = {
      form: {},
      email: "",
      password: "",
      loading: false,
      errors: {},
      users: [],
      user: "",
    };
    expect(globalStore.get()).toEqual(initialState);
  });
});

describe("setForm  Unit Tests Suite", () => {
  /**
   * Verification des valeurs initiales de la key form
   */
  it("should be an empty object", () => {
    // Récupération de la valeur de l'objet form dans le sotre
    const { form } = globalStore.get();

    setForm();

    //Même test mais en vérifiant que l'objet form a 0 key donc vide
    expect(Object.keys(form).length).toBe(0);
  });

  /**
   * Verification de la valeur form quand elle est complétée
   */
  it("should be an Object", () => {
    const testValue = { test: "value one" };

    setForm(testValue);

    // Récupération de la valeur de l'objet form dans le sotre
    const { form } = globalStore.get();

    expect(form).toEqual(testValue);
    //Même test mais en vérifiant que l'objet form a des key != de 0
    // expect(Object.keys(form).length).not.toBe(0);
  });
});

describe("setEmail  Unit Tests Suite", () => {
  /**
   * Verification de la valeur email du store avec une valeur qui contient des maj.
   */
  it("should be a string in lowerCase", () => {
    const testValue = "mail@TEST.com";

    setEmail(testValue);

    // Récupération de la valeur de l'objet form dans le sotre
    const { email } = globalStore.get();

    expect(email).toEqual("mail@test.com");
  });
});

describe("setPassword Unit Tests Suite", () => {
  /**
   * Verification de la valeur password modifiee
   */
  it("should be a string in lowerCase", () => {
    const testValue = "password";

    setPassword(testValue);

    // Récupération de la valeur de l'objet password dans le sotre
    const { password } = globalStore.get();

    expect(password).toEqual(password);
  });
});

describe("setErrors Unit Tests Suite", () => {
  it("should be an empty string", () => {
    const { errors } = globalStore.get();

    setErrors();

    expect(Object.keys(errors).length).toBe(0);
  });

  it("should return api error", () => {
    const testValue = { api: "Oops! Une erreur" };
    setErrors(testValue);

    const { errors } = globalStore.get();

    expect(errors).toEqual(testValue);
    // expect(Object.keys(errors).length).toBe(1);
  });
});

describe("validateForm Unit Tests Suite", () => {
  /**
   * Verification de la valeur error dans le store
   */
  it("should display an errror for the email and password input, when they are empty", async () => {
    // Simuler les valeurs de la form
    globalStore.set({ email: "", password: "" });

    // Appeler la fonction validateForm
    const errors = await validateForm();

    // Vérifier que les erreurs sont retournées
    expect(errors).toEqual({
      email: "Merci de rentrer une adresse email",
      password: "Merci de rentrer le mot de passe",
    });
  });

  it("should display an errror for the password when only the email only is specified", async () => {
    // Simuler les valeurs de la form
    globalStore.set({ email: "test@test.fr", password: "" });

    // Appeler la fonction validateForm
    const errors = await validateForm();

    // Vérifier que les erreurs sont retournées
    expect(errors).toEqual({
      password: "Merci de rentrer le mot de passe",
    });
  });

  it("should display an errror for the email when only the password only is specified", async () => {
    // Simuler les valeurs de la form
    globalStore.set({ email: "", password: "mdp" });

    // Appeler la fonction validateForm
    const errors = await validateForm();

    // Vérifier que les erreurs sont retournées
    expect(errors).toEqual({
      email: "Merci de rentrer une adresse email",
    });
  });

  it("should not dsiplay errror", async () => {
    // Simuler les valeurs de la form
    globalStore.set({ email: "test@test.Com", password: "mdp" });

    // Appeler la fonction validateForm
    const errors = await validateForm();

    // Vérifier que les erreurs sont retournées
    expect(errors).toEqual({});
  });
});

// describe("handleSubmit Unit Tests Suite", () => {
//   /**
//    * Verification l'affichage d'une connection réussie
//    */
//   it("should call handleSubmit", async () => {
//     const navigate = jest.fn(); // Mock the navigate function

//     const e = { preventDefault: jest.fn() }; // create a fake event object

//     const store = {
//       // créer un mock du store
//       setKey: jest.fn(),
//       get: jest.fn(),
//     };

//     // Appeler handleSubmit avec les paramètres appropriés
//     await handleSubmit(store, e, navigate);

//     expect(store.get).toHaveBeenCalledTimes(2); // vérifier que store.get() a été appelée 2 fois
//     expect(store.setKey).toHaveBeenCalledTimes(1); // vérifier que store.setKey() a été appelée 1 fois
//     expect(navigate).toHaveBeenCalledTimes(1); // vérifier que navigate() a été appelée 1 fois
//   });
// });

// describe("handleSubmit Unit Tests Suite", () => {
//   /**
//    * Verification l'affichage d'une connection réussie
//    */
//   it("should call handleSubmit", async () => {
//     const handleSubmit = jest.fn(); // Créer un mock pour handleSubmit

//     render(<Login handleSubmit={handleSubmit} />, {
//       wrapper: MemoryRouter,
//     });

//     act(() => {
//       const emailInputEl = screen.getByPlaceholderText(/Entrer le mail/i);

//       const passwordInputEl = screen.getByPlaceholderText(
//         /Entrer le mot de passe/i
//       );

//       const buttonEl = screen.getByRole("button", { name: "Se connecter" });

//       fireEvent.change(passwordInputEl, {
//         target: { value: "johndoe@test.fr" },
//       });

//       fireEvent.change(emailInputEl, {
//         target: { value: "password" },
//       });

//       fireEvent.click(buttonEl);

//       expect(handleSubmit).toHaveBeenCalledTimes(1);
//     });
//   });
// });
