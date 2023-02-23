import { createGlobalStyle } from "styled-components";
import { TEXT_COLOR } from "../utils/theme";

/**
 * Création d'un composant permettant de personnaliser le style
 * global de l'application
 */
export const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }
  * {
    box-sizing: border-box;
    font-family: 'Mukta', sans-serif;
    color: ${TEXT_COLOR.PRIMARY}
  }

`;
