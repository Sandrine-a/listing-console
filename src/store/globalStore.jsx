import { action, map } from "nanostores";
import { delete_user, get_token, get_users, get_user } from "../providers/Api";

/**
 * Créer le store qui contient tout l'état de mon composant
 * NanoCalculator
 */
export const globalStore = map({
  form: {},
  email: "",
  password: "",
  loading: false,
  errors: {},
  users: [],
  user: "",
});

/**
 * Action permettant de changer le form
 */
export const setForm = action(globalStore, "setForm", (store, form) => {
  store.setKey("form", form);
});

/**
 * Action permettant de changer l'email
 */
export const setEmail = action(globalStore, "setEmail", (store, email) => {
  store.setKey("email", email.toLowerCase());
});

/**
 * Action permettant de changer les password
 */
export const setPassword = action(
  globalStore,
  "setPassword",
  (store, password) => {
    store.setKey("password", password);
  }
);

/**
 * Action permettant de changer le loading
 */
export const setloading = action(
  globalStore,
  "setloading",
  (store, loading) => {
    store.setKey("loading", loading);
  }
);

/**
 * Action permettant de changer et afficher les erreurs
 */
export const setError = action(globalStore, "setError", (store, error) => {
  store.setKey("error", error);
});

/**
 * Action permettant de changer et afficher les erreurs
 */
export const setUser = action(globalStore, "setUser", (store, user) => {
  store.setKey("user", user);
});

/**
 * Action permettant d'envoyer la request login
 */
export const logUser = action(
  globalStore,
  "logUser",
  async (store, navigate) => {
    //On affiche le loading

    setloading(true);

    const { email, password } = store.get();

    try {
      //Demande de token
      const data = await get_token(email, password);

      // On enregistre le token dans le « localStorage »
      localStorage.setItem("token", data.token);

      const response = await get_user(data.token);

      console.log(response);
      navigate("/home");
    } catch (error) {
      //On supprime l'affichage du loading
      setloading(false);
      //On affiche l'erreur
      setError(`Oops! Erreurs d'identifcation!`);
    }
  }
);

/**
 * Action permettant d'envoyer la request get all users
 */
export const getUsers = action(globalStore, "getUsers", async (store, data) => {
  //On affiche le loading
  setloading(true);

  try {
    setloading(true);
    // Recuperation du token dans localstorage
    const userToken = localStorage.getItem("token");
    console.log("usertoeken ==", userToken);
    const response = await get_users(userToken);
    console.log("response == ", response.data);
    store.setKey("users", response.data);
  } catch (error) {
    //On supprime l'affichage du loading
    setloading(false);
    //On affiche l'erreur
    setError(`Oops! Erreurs d'identifcation!`);
  }
});

/**
 * Action permettant d'envoyer la request updateuser
 */
export const deleteUser = action(globalStore, "deleteUser", async (store) => {
  try {
    //On affiche le loading
    setloading(true);
    //Recuperation du user dans le
    const { user } = store.get();

    const userToken = localStorage.getItem("token");
    console.log("usertoeken ==", userToken);

    const response = await delete_user(userToken, user.id);
    console.log(response);

    // //Recuperation du token
    // const userToken = await getStoreData(USER_TOKEN_KEY);
    // //Le provider retourne la response.status
    // const response = await delete_user(userToken, id);
    // if (response == 200) {
    //   setloading(false);
    //   logout()
    //   //On supprime le token
    //   removeStoreData(USER_TOKEN_KEY);
    //   resetValues();
    // } else {
    //   setloading(false);
    //   setError({
    //     api: {
    //       value: "Oopss! Erreur interne. Merci de retenter dans un instant.",
    //     },
    //   });
    // }
  } catch (error) {
    //On supprime l'affichage du loading
    setloading(false);
    //On affiche l'erreur
    setError("Oopss!");
  }
});

export const handleSubmit = action(
  globalStore,
  "handleSubmit",
  async (store, e, navigate) => {
    e.preventDefault();
    const formErrors = await validateForm();

    if (Object.keys(formErrors).length > 0) {
      store.setKey("errors", formErrors);
    } else {
      console.log("no error");

      logUser(navigate);
    }
  }
);

export const validateForm = action(
  globalStore,
  "validateForm",
  async (store) => {
    const { email, password } = store.get();

    const newErrors = {};

    if (!email || email === "")
      newErrors.email = "Merci de rentrer une adresse email";

    if (!password || password === "")
      newErrors.password = "Merci de rentrer le mot de passe";

    return newErrors;
  }
);
