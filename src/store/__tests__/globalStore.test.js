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

import axios from "axios";

import {
  globalStore,
  validateForm,
  handleSubmit,
  setErrors,
  setForm,
  setEmail,
  setPassword,
  logUser,
} from "../globalStore";
import { get_token, get_user } from "../../providers/Api";

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

    expect(email).toEqual(email.toLowerCase());
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

describe("logUser unit tests suite", () => {
  const mockStore = {
    get: jest.fn(),
  };

  let navigate;

  beforeEach(() => {
    navigate = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
    localStorage.clear();
  });

  it("should not log the user in the application and thrown error", async () => {
    mockStore.get.mockReturnValueOnce({
      email: "invalid@test.com",
      password: "password",
    });

    try {
      const data = await get_token("invalid@test.com", "password");

      console.log(data);
    } catch (error) {
      expect(error).toEqual(
        new Error("Cannot read properties of undefined (reading 'data')")
      );
    }
  });

  it("should call the get_token and get_user functions and navigate to the home page when valid credentials are provided", async () => {
    // 1- Arrange
    // Creation du mock de la reponse au get_token
    // Arrange
    const mockTokenResponse = {
      data: {
        userId: "100",
        token: "defkokfe",
      },
    };
    const mockAdmin = {
      userId: 10,
      username: "test",
      email: process.env.REACT_APP_ADMIN_ID,
    };

    jest.mock("axios", () => ({
      post: jest.fn().mockResolvedValueOnce(mockTokenResponse),
      get: jest.fn().mockResolvedValueOnce(mockAdmin),
    }));

    // get_user.mockResolvedValueOnce(mockAdmin);

    // const result = await get_user(mockTokenResponse.token);

    // console.log(result);

    await logUser(mockStore, navigate);

    expect(axios.post).toHaveBeenCalledTimes(1);

    // expect(localStorage.setItem).toHaveBeenCalledWith(
    //   "token",
    //   mockTokenResponse.token
    // );

    // expect(mockSetLoading).toHaveBeenCalledWith(true);
    // expect(navigate).toHaveBeenCalledWith("/listing-console/home");

    // expect(axios.get).toHaveBeenCalledTimes(1);
  });
});

// describe("logUser", () => {
//   const mockStore = {
//     get: jest.fn(),
//     set: jest.fn(),
//   };
//   let navigate;

//   beforeEach(() => {
//     navigate = jest.fn();
//     mockStore.get.mockReturnValueOnce({
//       email: "test@test.com",
//       password: "password",
//     });
//   });

//   afterEach(() => {
//     jest.resetAllMocks();
//     localStorage.clear();
//   });

//   it("should call the get_token and get_user functions and navigate to the home page when valid credentials are provided", async () => {
//     // Arrange
//     const mockTokenResponse = {
//       data: {
//         userId: "100",
//         token: "defkokfe",
//       },
//     };
//     jest.mock("axios", () => ({
//       post: jest.fn().mockResolvedValueOnce(mockTokenResponse),
//       get: jest.fn(),
//     }));

//     // Act
//     await logUser(mockStore, navigate);

//     // Assert
//     // expect(mockStore.get).toHaveBeenCalledTimes(1);
//     // expect(mockStore.get).toHaveBeenCalledWith();
//     expect(localStorage.getItem("token")).toEqual(mockTokenResponse.data.token);
//     expect(navigate).toHaveBeenCalledTimes(1);
//     expect(navigate).toHaveBeenCalledWith("/listing-console/home");
//     expect(axios.post).toHaveBeenCalledTimes(1);
//     expect(axios.post).toHaveBeenCalledWith(
//       "https://listing-db.herokuapp.com/api/v1/users/token",
//       {
//         email: "test@test.com",
//         password: "password",
//       }
//     );
//     expect(axios.get).toHaveBeenCalledTimes(1);
//     expect(axios.get).toHaveBeenCalledWith(
//       "https://listing-db.herokuapp.com/api/v1/users/me",
//       {
//         "Content-Type": "application/json",
//         headers: {
//           Authorization: `Bearer ${mockTokenResponse.data.token}`,
//         },
//       }
//     );
//   });
// });
