import React from "react";
import { useHistory } from "react-router-dom";
import { goToListTripsPage, goToLoginPage } from "../Routes/coordinator";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Login from "../img/login.png";
import styled from "styled-components";
import bcgroundGif from "../img/espaco.gif"


const HomePages = () => {
  const history = useHistory();
  const token = window.localStorage.getItem("token");

  const logUser = (
    token ? <p>Usuário Logado!</p> : <p>Administrativo</p>
    
  )
    
  
  
  return (
    <AppHome>
      <Header />
      <MainContainerHome>
        <section>
          <img
            onClick={() => goToLoginPage(history)}
            alt='login administrativo'
            title='Área Administrativa'
            src={Login}
          />
          <p onClick={() => goToLoginPage(history)}>{logUser}</p>
        </section>
        <SpaceContainer>
          <button onClick={() => goToListTripsPage(history)}>
            VER VIAGENS
          </button>
        </SpaceContainer>
      </MainContainerHome>
      <Footer />
    </AppHome>
  );
};

export default HomePages;

const AppHome = styled.div`
  background-image: url(${bcgroundGif});
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-self:center;
  justify-content:center;
  justify-items:center;
  border-radius: 30px;
  box-shadow: 4px 10px 30px #261d1d;

`;

const MainContainerHome = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 75vh;
  color: #f9f9f9;

  section {
    width: 88vw;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-right: 2%;
    cursor: pointer;

    img {
      width: clamp(60px, 7%, 150px);
      height: 100%;
      margin-right: 1.5%;
      :hover {
        transform: scale(1.3);
        transition: all 0.6s ease;
      }
    }
    p {
      width: clamp(120px, 100%, 160px);
      margin-top: 2px;
      font-size: clamp(0.5em, 0.6em + 1vw, 1.1em);
      color: #f9f9f9;
      cursor: pointer;
      :hover {
        transform: scale(1.1);
        transition: all 0.6s ease;
      }
      @media (max-width: 800px) {
       margin-left:50%;
        
  }
    }
  }
`;
const SpaceContainer = styled.div`
  display: flex;
  justify-content: center;
  width: clamp(250px, 300px, 400px);
  height: clamp(250px, 300px, 400px);
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 50%;
  box-shadow: 4px 5px 30px #261d1d;
  :hover {
    opacity: 0.8;
    transform: scale(1.1);
    transition: all 0.5s ease-in;
    transform: rotate(360deg);
  }
  button {
    width: clamp(230px, 30%, 450px);
    height: 70px;
    background-color: rgba(250, 252, 252, 0.7);
    color: black;
    border-radius: 50px;
    align-self: center;
    font-size: 1.5rem;
    cursor: pointer;
    border-top: 2px solid #eceff2;
    border-left: 2px solid #eceff2;
    :hover {
      background-color: rgba(250, 252, 252, 0.1);
      transform: scale(1.1);
      transition: all 0.6s ease;
    }
  }
`;
