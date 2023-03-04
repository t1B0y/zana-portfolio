import styled from "styled-components";
import { Link } from "react-router-dom";

import { primaryBlack, secondaryBlack, white } from "./variables";

export const Menu = styled.div`
  padding: 20px 15px;
  position: sticky;
  margin-right: 50px;
  left: 0;
  width: 250px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.08), 0 10px 10px rgba(0, 0, 0, 0.08);
  background-color: ${primaryBlack};
`;

export const MenuTitle = styled.h1`
  font-weight: 800;
  font-size: 1.5em;
  color: white;
`;

export const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  width: 90%;
  border-radius: 10px;
  padding: 12px;
  font-size: 1em;
  color: ${white};
  font-weight: 400;
  text-decoration: none;
  &:hover {
    background-color: ${secondaryBlack};
  }
`;
