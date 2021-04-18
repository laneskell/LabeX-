import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import { TiArrowBackOutline } from "react-icons/ti";
import { useProtectedPage } from "../hooks/useProtectedPage";
import { goToLogout } from "../Routes/coordinator";
import { urlAllTrips, urlTripDetails } from "../Components/url-api";
import swal from "sweetalert"; /* lib de Alert personalizado*/

const TripDetailsPage = () => {
  useProtectedPage();
  const [tripDetail, setTripDetail] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [approved, setApproved] = useState([]);
  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    getTripDetailChosen();
  }, []);

  const getTripDetailChosen = (id) => {
    const token = window.localStorage.getItem("token");
    axios
      .get(`${urlTripDetails}${params.id}`, {
        headers: {
          auth: token,
        },
      })
      .then((res) => {
        setTripDetail(res.data.trip);
        setCandidates(res.data.trip.candidates);
        setApproved(res.data.trip.approved);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const aproveCandidate = (candidateId, name, aprov) => {
    const token = window.localStorage.getItem("token");
    const body = { approve: aprov };
    if (body.approve === false) {
      swal({
        title: `Deseja Reprovar a inscrição de ${name}?`,
        text: ` Os dados de ${name} Serão deletados definitivamente do sistema!`,
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios
            .put(
              `${urlAllTrips}${params.id}/candidates/${candidateId}/decide`,
              body,
              {
                headers: {
                  auth: token,
                },
              }
            )
            .then((res) => {
              swal(
                `A inscrição de ${name} foi Reprovada!`,
                "Dados excluídos!",
                "error"
              );
              getTripDetailChosen();
            })
            .catch((error) => {
              alert(error);
            });
        } else {
          swal("OK, Nada foi deletado!");
        }
      });
    } else if (body.approve === true) {
      axios
        .put(
          `${urlAllTrips}${params.id}/candidates/${candidateId}/decide`,
          body,
          {
            headers: {
              auth: token,
            },
          }
        )
        .then((res) => {
          swal(
            "CANDIDATO ACEITO !",
            `Inscrição de ${name} foi Aprovada!`,
            "success"
          );
          getTripDetailChosen();
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const tripDetailsPage = (
    <CardDetail>
      <h3>{tripDetail.name}</h3>
      <p>
        <strong>Saída:</strong>
        {tripDetail.date}
      </p>
      <p>
        <strong>Descrição:</strong>
        {tripDetail.description}
      </p>
      <p>
        <strong>Planeta:</strong>
        {tripDetail.planet}
      </p>
      <p>
        <strong>Duração:</strong>
        {tripDetail.durationInDays} dias
      </p>
    </CardDetail>
  );

  const getCandidates = candidates.map((iten) => (
    <CardDetail key={iten.id}>
      <h4>
        <strong>Nome: </strong>
        {iten.name}, {iten.age} anos
      </h4>
      <p>
        <strong>Profissão: </strong> {iten.profession}
      </p>
      <p>
        <strong>Sobre: </strong> {iten.applicationText}
      </p>
      <p>
        <strong>País: </strong> {iten.country}{" "}
      </p>
      <ApprovButton onClick={() => aproveCandidate(iten.id, iten.name, true)}>
        Aprovar
      </ApprovButton>
      <NoApprovButton onClick={() => aproveCandidate(iten.id, iten.name, false)}>
        Reprovar
      </NoApprovButton>
    </CardDetail>
  ));

  const getApproved = approved.map((iten) => (
    
      <li key={iten.id}>{iten.name}</li>
   
  ));

  return (
    <div>
      <HeaderContainerListPage>
        <BackPage onClick={history.goBack}>
          <TiArrowBackOutline />
        </BackPage>
        <Header />
        <button onClick={() => goToLogout(history)}>logout</button>
      </HeaderContainerListPage>

      <MainAdminPage>
        <div>
          <h2>DETALHES DA VIAGEM</h2>
          {tripDetailsPage}
        </div>
        <div>
        <h2>CANDITADOS APROVADOS</h2>
          <CardCandidates> {getApproved} </CardCandidates>
        </div>
        <div>
          <h2>CANDIDATOS PENDENTES</h2>
          <div> {getCandidates} </div>
        </div>
      </MainAdminPage>

      <Footer />
    </div>
  );
};

export default TripDetailsPage;

const MainAdminPage = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  height:75vh;
  gap: 1%;
  flex-wrap: wrap;
  background-color: rgba(30, 31, 33, 0.6);
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    height: 100%;
    h2{
    font-size: 0.9rem;
    }
   
  }
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
    width: clamp(70px, 50%, 450px);
    height: 50px;
    background-color: rgba(30, 31, 33, 0.8);
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
      grid-column-start:span 3;
      margin-bottom:10%;
      margin-left:60%;
      justify-self: center;
      width: 90px;
      height: 50%;
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
const CardDetail = styled.div`
  width: clamp(320px, 80%, 500px);
  height: clamp(220px, 30%, 500px);
  padding: 2%;
  border-radius: 20px;
  background-color: rgba(30, 31, 33, 0.8);
  box-shadow: inset 0 0 1em silver;
`;
const CardCandidates = styled.p`
  width: clamp(300px, 80%, 500px);
  padding: 2%;
  border-radius: 20px;
  background-color: rgba(30, 31, 33, 0.8);
  box-shadow: inset 0 0 1em silver;
  
   
`;
const ApprovButton = styled.button`
width: clamp(5px, 40%, 100px);
  height: 30px;
  background-color: rgba(250, 252, 255, 0.3);
  font-weight: 400;
  color: #f9f9f9;
  border-radius: 10px;
  align-self: center;
  font-size: 1rem;
  margin-right:8%;
  cursor: pointer;
  border-top: 2px solid #7bc278;
  border-left: 2px solid #7bc278;
  :hover {
    background-color: rgba(93, 240, 118, 0.2);
    transform: scale(1.1);
    transition: all 0.4s ease;
  }
`;
const NoApprovButton = styled.button`
width: clamp(5px, 40%, 100px);
  height: 30px;
  background-color: rgba(250, 252, 255, 0.3);
  font-weight: 400;
  color: #f9f9f9;
  border-radius: 10px;
  align-self: center;
  font-size: 1rem;
  cursor: pointer;
  border-top: 2px solid #d95932;
  border-left: 2px solid #d95932;
  :hover {
    background-color: rgba(255, 75, 20, 0.2);
    transform: scale(1.1);
    transition: all 0.4s ease;
  }
`;