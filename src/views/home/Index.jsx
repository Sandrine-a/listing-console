import React, { useEffect } from "react";

import { useStore } from "@nanostores/react";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

import {
  deleteUser,
  getUsers,
  globalStore,
  setUser,
} from "../../store/globalStore";

export default function Index() {
  const { users } = useStore(globalStore);
  // Création d'un effet permettant de s'auto connecter
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <h1>Bienvenue sur la console d'administration</h1>

      <div></div>

      <div>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#id</th>
              <th>email</th>
              <th>Username</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>
                  {!user.isAdmin ? (
                    <Button
                      className="btn btn-danger"
                      onClick={() => {
                        window.confirm(
                          `Attention voulez-vous vraiment supprimer l'user ${user.id} ?`
                        );
                        if (window.confirm) {
                          setUser(user);
                          deleteUser();
                        }
                      }}
                    >
                      Suppprimer
                    </Button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
