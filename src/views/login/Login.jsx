import React from "react";
import { useStore } from "@nanostores/react";
import { useNavigate } from "react-router-dom";

import Form from "react-bootstrap/Form";
import {
  globalStore,
  handleSubmit,
  setEmail,
  setPassword,
} from "../../store/globalStore";

import {
  ErrorMessage,
  Input,
  LoginButton,
  Logo,
  LogoWrapper,
  SectionContainer,
  Subtitle,
  Title,
  TitleName,
} from "./Login.Style";

import MainLogo from "../../assets/img/logo_listing_application.png";

export default function Login() {
  const { email, password, errors } = useStore(globalStore);

  const navigate = useNavigate();

  return (
    <div className="container">
      <LogoWrapper>
        <Logo src={MainLogo} alt="Logo application Listing" />
      </LogoWrapper>

      <div>
        <Title data-testid="login-page-title">
          Bienvenue sur la console d'administration{" "}
          <TitleName>Listing</TitleName>{" "}
        </Title>
      </div>

      <SectionContainer>
        <Subtitle data-testid="login-page-h2">Accéder à la console</Subtitle>
      </SectionContainer>

      <SectionContainer>
        <p>
          Pour gérer les utilisateurs, merci de vous identifiez ci-dessous:{" "}
        </p>
      </SectionContainer>

      <SectionContainer>
        <ErrorMessage data-testid="api-error-msg">{errors.api}</ErrorMessage>
      </SectionContainer>

      <div className="row justify-content-center align-item-center">
        <Form className="rounded p-4 p-sm-3">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Adresse mail</Form.Label>
            <Input
              type="email"
              placeholder="Entrer le mail"
              onChange={(e) => {
                // console.log(e.target.value);
                // setField("email", e.target.value);
                setEmail(e.target.value);
              }}
              value={email}
              isInvalid={!!errors.email}
            />
            <Form.Control.Feedback
              type="invalid"
              data-testid="user-email-error-msg"
            >
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Mot de passe</Form.Label>
            <Input
              type="password"
              placeholder="Entrer le mot de passe"
              onChange={(e) => setPassword(e.currentTarget.value)}
              // onChange={(e) => { setField("password", e.target.value);}}
              value={password}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback
              type="invalid"
              data-testid="user-password-error-msg"
            >
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <SectionContainer>
            <LoginButton
              type="submit"
              // onClick={(e) => {
              //   e.preventDefault();
              //   logUser();
              // }}
              onClick={(e) => handleSubmit(e, navigate)}
            >
              Se connecter
            </LoginButton>
          </SectionContainer>
        </Form>
      </div>
    </div>
  );
}
