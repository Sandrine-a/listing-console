import axios from "axios";

export const get_token = async (email, password) => {
  try {
    const response = await axios.post(
      "https://listing-db.herokuapp.com/api/v1/users/token",
      {
        email: email,
        password: password,
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("err get_token", error.response.data);
    // throw Error(error.response.data);
  }
};

export const get_user = async (userToken) => {
  try {
    const response = await axios.get(
      "https://listing-db.herokuapp.com/api/v1/users/me",
      {
        "Content-Type": "application/json",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
};

export const get_users = async (userToken) => {
  try {
    const response = await axios.get(
      "https://listing-db.herokuapp.com/api/v1/users",
      {
        "Content-Type": "application/json",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
};

export const delete_user = async (userToken, id) => {
  try {
    const response = await axios.delete(
      `https://listing-db.herokuapp.com/api/v1/users/${id}`,
      {
        "Content-Type": "application/json",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );
    return response.status;
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
};
