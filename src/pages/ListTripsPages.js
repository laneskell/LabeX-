import React from "react";
import { useHistory } from "react-router-dom";
import useRequestData from "../hooks/userRequestData";
import { goToApplicationFormPage } from "../Routes/coordinator";
import { urlAllTrips } from "../Components/url-api";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { TiArrowBackOutline } from "react-icons/ti";
import styled from "styled-components";

const ListTripsPage = (props) => {
  const history = useHistory();
  const listTrips = useRequestData(urlAllTrips, history,  []);
  

  const getTrips =
    listTrips.trips &&
    listTrips.trips.map((iten) => {
      return (
        <CardTrip key={iten.id}>
          <h3>{iten.name}</h3>
          <p>
            <strong>Saída:</strong> {iten.date}
          </p>
          <p>
            <strong>Descrição:</strong> {iten.description}
          </p>
          <p>
            <strong>Planeta:</strong> {iten.planet}
          </p>
          <p>
            <strong>Duração:</strong> {iten.durationInDays} dias
          </p>
        </CardTrip>
      );
    });

  return (
    <div>
   
      <HeaderContainerListPage>
        <BtnBackPage onClick={history.goBack}>
          <TiArrowBackOutline />
        </BtnBackPage>
        <Header />
        <button onClick={() => goToApplicationFormPage(history)}>
          INSCREVA-SE EM UMA VIAGEM
        </button>
      </HeaderContainerListPage>
        <MainListTrips>
        <h1>PRÓXIMAS VIAGENS</h1>
        <GridCardTrips>{getTrips}</GridCardTrips>
      </MainListTrips> 
      
      
      
     
     <Footer /> 
      
    </div>
  );
};
export default ListTripsPage;

// CSS - STYLED COMPONENTS =>

const CardTrip = styled.div`
  width: clamp(350px, 25%, 800px);
  border: 1px solid white;
  border-radius: 20px;
  padding: 1%;
  margin: 1%;
  background-color: rgba(30, 31, 33, 0.8);
  box-shadow: inset 0 0 1em silver;
  font-weight: 900;
`;
const HeaderContainerListPage = styled.div`
  display: grid;
  grid-template-columns: 1fr 7fr 2fr;
  width: 100vw;
  background-color: rgba(250, 252, 255, 0.3);
  box-shadow: inset 0 0 1em silver;
  @media (max-width: 800px) {
    grid-template-columns: 1fr 5fr;
    grid-template-rows: 1fr 1fr;
    height: 20vh;
  }
  button {
    width: clamp(100px, 90%, 450px);
    height: 50px;
    background-color: rgba(30, 31, 33, 0.4);
    font-weight: 900;
    color: #f9f9f9;
    border-radius: 50px;
    align-self: center;
    font-size: 1.1rem;
    cursor: pointer;
    border-top: 2px solid #eceff2;
    border-left: 2px solid #eceff2;
    :hover {
      background-color: rgba(72, 32, 125, 0.7);
      transform: scale(1.1);
      transition: all 0.4s ease;
    }
    @media (max-width: 800px) {
      grid-column: span 2;
      margin-top: 0;
      justify-self: center;
      width: 80%;
      height: 100%;
    }
  }
`;
const BtnBackPage = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 70px;
  margin: 10%;
`;
const MainListTrips = styled.div`
  display: flex;
  flex-direction: column;
  height: 75vh;
  background-color: rgba(30, 31, 33, 0.6);
  overflow: auto;
  h1 {
    font-size: clamp(20px, 20%, 800px);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;
const GridCardTrips = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
