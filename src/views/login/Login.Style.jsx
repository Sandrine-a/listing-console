import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { TEXT_COLOR, COLORS, RADIUS } from "../../utils/theme";

/**
 * Container affichant tout de manière centré
 */
export const CenteredMainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  min-height: 100vh;
  min-width: 100vw;
`;

export const LogoWrapper = styled.div`
  margin-top: 100px;
  margin-bottom: 70px;
  display: flex;
  justify-content: center;
`;

export const Logo = styled.img`
  max-width: 350px;
  max-height: 200px;
`;

export const Title = styled.h1`
  color: ${TEXT_COLOR.SECONDARY};
  font-family: "Oswald", sans-serif;
  text-align: center;
`;

export const TitleName = styled.span`
  color: ${COLORS.PRIMARY};
  font-family: "Oswald", sans-serif;
`;

export const SectionContainer = styled.div`
  margin-top: 30px;
`;

export const Input = styled(Form.Control)`
  border-radius: ${RADIUS.rectangle};
  &:focus {
    box-shadow: 0 0 0 0.2rem ${COLORS.PRIMARY};
  }
`;

export const Subtitle = styled.h2`
  font-family: "Mukta", sans-serif;
  color: ${TEXT_COLOR.PRIMARY};
`;

export const LoginButton = styled(Button)`
  background-color: ${COLORS.PRIMARY};
  border: none;
  /* border-color: ${COLORS.PRIMARY};
  border-width: 2px; */
  color: ${TEXT_COLOR.PRIMARY};
  font-weight: 700;
  border-radius: ${RADIUS.rond};
  &:hover {
    cursor: pointer;
    box-shadow: 2px 2px 8px #e2e3e9;
    background-color: ${COLORS.PRIMARY_DARK};
    text-shadow: 1px 1px 1px ${TEXT_COLOR.PRIMARY};
    /* border: solid;
    border-color: #e2e3e9;
    border-width: 2px; */
  }
`;

export const ErrorMessage = styled.p`
  color: red;
`;
