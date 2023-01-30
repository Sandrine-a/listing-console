import React, { useState } from "react";
import { useStore } from "@nanostores/react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  globalStore,
  handleSubmit,

  setEmail,
  setPassword,
} from "../../store/globalStore";

export default function Login() {
  const { email, password, errors } = useStore(globalStore);

  const navigate = useNavigate();

  // const [form, setForm] = useState({});
  // const [errors, setErrors] = useState({});

  // const setField = (field, value) => {
  //   setForm({
  //     ...form,
  //     [field]: value,
  //   });

  //   if (!!errors[field]) {
  //     setErrors({
  //       ...errors,
  //       [field]: null,
  //     });
  //   }
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   console.log(form);
  // }


  // useEffect(() => {
  //   if (userIsLog) {
  //     navigate("/home");
  //   }
  // }, [userIsLog]);

  return (
    <div className="container">
      <div className="row justify-content-center align-item-center">
        <h1>Login</h1>
      </div>

      <div className="row justify-content-center align-item-center">
        <Form className="rounded p-4 p-sm-3">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Adresse mail</Form.Label>
            <Form.Control
              type="email"
              placeholder="Entrer le mail"
              onChange={(e) => {
                // console.log(e.target.value);
                // setField("email", e.target.value);
                setEmail(e.target.value);
              }}
              value={email}
              // isInvalid={!!errors.email}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Mot de passe</Form.Label>
            <Form.Control
              type="password"
              placeholder="Entrer le mot de passe"
              onChange={(e) => setPassword(e.currentTarget.value)}
              // onChange={(e) => { setField("password", e.target.value);}}
              value={password}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            // onClick={(e) => {
            //   e.preventDefault();
            //   logUser();
            // }}
            onClick={(e) => handleSubmit(e, navigate)}
          >
            Se connecter
          </Button>
        </Form>
      </div>
    </div>
  );
}
