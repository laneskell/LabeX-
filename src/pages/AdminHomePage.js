import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useProtectedPage } from "../hooks/useProtectedPage";
import { goToLogout, goToHomePage } from "../Routes/coordinator";
import { urlAllTrips } from "../Components/url-api";
import useRequestData from "../hooks/userRequestData";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import styled from "styled-components";
import CreateTripPage from "../pages/CreateTripPage";
import { FaTrashAlt } from "react-icons/fa";
import { TiArrowBackOutline } from "react-icons/ti";
import axios from "axios";
import swal from "sweetalert";

const AdminHomePage = () => {
  useProtectedPage();
  const history = useHistory();
  const [reload, setReload] = useState(false);
  const listTrips = useRequestData(urlAllTrips, reload, []);
  const goToDetailsPage = (id) => {
    history.push(`/admin/trips/${id}`);
  };

  const deleteTrip = (trip, name) => {
    const token = window.localStorage.getItem("token");
    swal({
      title: `Deseja deletar a viagem ${name}?`,
      text:
        "Essa viagem será deletada junto com todos os dados de inscritos e aprovados!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`${urlAllTrips}${trip}`, {
            headers: {
              auth: token,
            },
          })
          .then((response) => {
            swal(
              `A Viagem ${name}`,
              "foi deletada com sucesso!",
              "success"
            ).then(() => {
             !reload ? setReload(true): setReload(false)
            });
          })
          .catch((error) => {
            alert(`Não foi possível executar o comando, tente mais tarde!`);
            goToHomePage(history);
          });
      } else {
        swal("ok, Nada foi deletado!");
      }
    });
  };

  const getTrips =
    listTrips.trips &&
    listTrips.trips.map((iten) => {
      return (
        <TripContainer key={iten.id}>
          <DadosTripContainer onClick={() => goToDetailsPage(iten.id)}>
            <p>
              <strong>{iten.name}</strong>
            </p>
            <p>
              <strong>Saída:</strong> {iten.date}
            </p>
            <p>
              <strong>Planeta:</strong> {iten.planet}
            </p>
          </DadosTripContainer>
          <DeleteContainer onClick={() => deleteTrip(iten.id, iten.name)}>
            <p>
              <FaTrashAlt />
            </p>
          </DeleteContainer>
        </TripContainer>
      );
    });

  return (
    <div>
      <HeaderContainerListPage>
        <BackPage onClick={() => goToHomePage(history)}>
          <TiArrowBackOutline />
        </BackPage>
        <Header />
        <button onClick={() => goToLogout(history)}>logout</button>
      </HeaderContainerListPage>
      <MainDetails>
        <CreateTripPage reload={reload} setReload={setReload} />
        <TripsToChoose>
          <h3>PRÓXIMAS VIAGENS</h3>
          <GridCardTrips>{getTrips}</GridCardTrips>
        </TripsToChoose>
      </MainDetails>
      <Footer />
    </div>
  );
};
export default AdminHomePage;

// CSS STYLED COMPONENTS =>
const GridCardTrips = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
 
`;
const MainDetails = styled.div`
  display: grid;
  background-color: rgba(30, 31, 33, 0.6);
  height: 75vh;
  justify-items:center ;
  align-items:center ;
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    overflow:auto;
  }
  
`;
const TripsToChoose = styled.div`
 width: 100%;
height: 100%;
overflow:auto;
@media (max-width: 800px) {
  overflow:scroll;
    grid-column-start: 1/1;
  }
h3{
  margin-left:10%;
  display: inline-flexbox;
  background-color: rgba(30, 31, 33, 0.9);
  font-size: 1.6rem;
  @media (max-width: 800px) {
    font-size: 1rem;
  }
}
`;
const HeaderContainerListPage = styled.div`
  display: grid;
  grid-template-columns: 1fr 7fr 2fr;
  width: 100vw;
  background-color: rgba(250, 252, 255, 0.3);
  box-shadow: inset 0 0 1em silver;
  button {
    width: clamp(100px, 50%, 450px);
    height: 50px;
    background-color: rgba(30, 31, 33, 0.9);
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
      margin-bottom:-70%;
      margin-left:0;
      justify-self: center;
      width: 80px;
      height: 30%;
    }
  }
`;
const BackPage = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 70px;
  margin: 10%;
  cursor: pointer;
  :hover {
      transform: scale(1.1);
      transition: all 0.6s ease;
    }
`;
const TripContainer = styled.div`
  display: grid;
  grid-template-columns: 10fr 2fr;
  align-content: center;
  width: clamp(350px, 25%, 800px);
  border: 1px solid white;
  border-radius: 20px;
  padding: 1%;
  margin: 1%;
  background-color: rgba(30, 31, 33, 0.8);
  box-shadow: inset 0 0 1em silver;
  font-weight: 900;
`;
const DadosTripContainer = styled.div`
  p:first-child {
    cursor: pointer;
    max-width: 100%;
    -moz-transition: all 0.5s;
    -webkit-transition: all 0.5s;
    transition: all 0.5s;
  }
`;
const DeleteContainer = styled.div`
  padding-top: 50%;
  text-align: center;
  p {
    cursor: pointer;
    :hover {
      transform: scale(1.8);
      transition: all 0.6s ease-in;
    }
  }
`;
