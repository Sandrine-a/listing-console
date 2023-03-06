import React from "react";
import { Link } from "react-router-dom";
import { CenteredMainContainer, Container } from "./Error.Style";

export default function Error() {
  return (
    <CenteredMainContainer>
      <Container>
        <h1 data-testid="error-page-h1">Oops! Cette page n'existe pas!</h1>
        <Link to="/listing-console">Retour accueil</Link>
      </Container>
    </CenteredMainContainer>
  );
}
