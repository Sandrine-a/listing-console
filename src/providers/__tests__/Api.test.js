import mockAxios from "axios";
import { delete_user, get_token, get_user, get_users } from "../Api";

const mockUsers = [
  { id: 1, email: "first@test.fr" },
  { id: 2, email: "two@test.fr" },
  { id: 3, email: "three@test.fr" },
];

const mockAdmin = {
  userId: 10,
  username: "test",
  email: process.env.REACT_APP_ADMIN_ID,
};

describe("get_token unit tests", () => {
  it("should call axios and return token", async () => {
    //setup : on mock l'implementation de la fonction axios qui se trouve dans __mock__
    mockAxios.post.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          userId: "test",
          token: "defkokfe",
        },
      })
    );

    // work
    const result = await get_token(
      process.env.REACT_APP_ADMIN_ID,
      process.env.REACT_APP_ADMIN_PW
    );

    // assertions / expects
    expect(result).toEqual({
      userId: "test",
      token: "defkokfe",
    });
    expect(mockAxios.post).toHaveBeenCalledTimes(1);
    // S'assurer que les bons paramettres sont appelés
    expect(mockAxios.post).toHaveBeenCalledWith(
      "https://listing-db.herokuapp.com/api/v1/users/token",
      {
        email: process.env.REACT_APP_ADMIN_ID,
        password: process.env.REACT_APP_ADMIN_PW,
      }
    );
  });

  it("should call axios and return status error", async () => {
    // arrange
    mockAxios.post.mockRejectedValueOnce({
      response: {
        status: 401,
      },
    });

    // act and assert
    try {
      const token = await get_token("user1", "password1");
    } catch (error) {
      expect(error).toEqual(
        new Error("Cannot read property 'data' of undefined")
      );
    }
  });
});

describe("get_user unit tests", () => {
  it("should call axios and return the users datas", async () => {
    //setup : on mock l'implementation de la fonction axios qui se trouve dans __mock__
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: mockAdmin,
      })
    );

    // work
    const user_token = "xyz";
    const headers = {
      "Content-Type": "application/json",
      headers: {
        Authorization: `Bearer ${user_token}`,
      },
    };
    const result = await get_user(user_token);

    // assertions / expects
    expect(result).toEqual(mockAdmin);
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    // S'assurer que les bons paramettres sont appelés
    expect(mockAxios.get).toHaveBeenCalledWith(
      "https://listing-db.herokuapp.com/api/v1/users/me",
      headers
    );
  });

  it("should call axios and return status error", async () => {
    // setup: mock axios.delete to throw an error
    mockAxios.get.mockImplementationOnce(() =>
      Promise.reject(new Error("Auth missing"))
    );

    // work
    try {
      await get_user();
    } catch (error) {
      // assertions / expects
      expect(error).toEqual(Error("Error: Auth missing"));
    }
  });
});

describe("get_users unit tests", () => {
  it("should call axios and return an array of users", async () => {
    //setup : on mock l'implementation de la fonction axios qui se trouve dans __mock__
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: { data: [mockUsers] },
      })
    );

    // work
    const user_token = "xyz";
    const headers = {
      "Content-Type": "application/json",
      headers: {
        Authorization: `Bearer ${user_token}`,
      },
    };
    const result = await get_users(user_token);

    // assertions / expects
    expect(result).toEqual({ data: [mockUsers] });
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    // S'assurer que les bons paramettres sont appelés
    expect(mockAxios.get).toHaveBeenCalledWith(
      "https://listing-db.herokuapp.com/api/v1/users",
      headers
    );
  });

  it("should call axios and return status error", async () => {
    // setup: mock axios.delete to throw an error
    mockAxios.get.mockImplementationOnce(() =>
      Promise.reject(new Error("Auth missing"))
    );

    // work
    try {
      await get_users();
    } catch (error) {
      // assertions / expects
      expect(error).toEqual(Error("Error: Auth missing"));
    }
  });
});

describe("delete_user unit tests", () => {
  it("should call axios and return status 200", async () => {
    //setup : on mock l'implementation de la fonction axios qui se trouve dans __mock__
    mockAxios.delete.mockImplementationOnce(() =>
      Promise.resolve({ status: 200 })
    );

    // work
    const user_token = "xyz";
    const id = 15;
    const headers = {
      "Content-Type": "application/json",
      headers: {
        Authorization: `Bearer ${user_token}`,
      },
    };
    const result = await delete_user(user_token, id);

    // assertions / expects
    expect(result).toEqual(200);
    expect(mockAxios.delete).toHaveBeenCalledTimes(1);
    // S'assurer que les bons paramètres sont appelés
    expect(mockAxios.delete).toHaveBeenCalledWith(
      `https://listing-db.herokuapp.com/api/v1/users/${id}`,
      headers
    );
  });

  it("should call axios and return status error", async () => {
    // setup: mock axios.delete to throw an error
    mockAxios.delete.mockImplementationOnce(() =>
      Promise.reject(new Error("Network Error"))
    );

    // work
    try {
      await delete_user();
    } catch (error) {
      // assertions / expects
      expect(error).toEqual(Error("Error: Network Error"));
    }
  });
});
