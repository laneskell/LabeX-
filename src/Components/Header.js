import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { goToHomePage } from "../Routes/coordinator";
import logo from "../img/logo.svg";

const Header = () => {
  const history = useHistory();
  return (
    <HeaderContainer>
      <img onClick={() => goToHomePage(history)} alt='logo labex' src={logo} />
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 15vh;

  img {
    width:clamp(260px, 30%, 1000px);
    height: auto;
    cursor: pointer;
    
    :hover{
    transform: scale(1.1);
    transition: all 0.8s ease-in;
    }
  }
`;
