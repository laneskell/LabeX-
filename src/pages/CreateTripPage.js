import React, { useState } from "react";
import { useForm } from "../hooks/useForm";
import axios from "axios";
import swal from "sweetalert";
import styled from "styled-components";
import { urlAllTrips } from "../Components/url-api";

const initialForm = {
  name: "",
  planet: "",
  date: "",
  description: "",
  durationInDays: "",
};

const CreateTripPage = (props) => {
  const [form, onChange] = useForm(initialForm);
  const [ show, setShow] = useState(false);

  const ShowHide = () =>{
    if (show){
     setShow(false) 
    } else if (!show){
      setShow(true)
    } 
  }

  const createTrip = (event) => {
    const token = window.localStorage.getItem("token");

    const body = {
      name: form.name,
      planet: form.planet,
      date: form.date,
      description: form.description,
      durationInDays: form.durationInDays,
    };
    event.preventDefault();
    axios
      .post(`${urlAllTrips}`, body, {
        headers: {
          auth: token,
        },
      })
      .then((response) => {
        swal(
          `A Viagem ${form.name}`,
          "foi criada com sucesso!",
          "success"
        ).then(() => {
          ShowHide();
          { props.reload ? props.setReload(false) : props.setReload(true) 
          }
       
        });
      })
      .catch((error) => {
        swal(error, "Dados incompletos, retorne para o formulário!", "error");
      });
  };

  const today = new Date();
  const minToday =
    today.getFullYear() +
    "-" +
    ("0" + (today.getMonth() + 1)).substr(-2) +
    "-" +
    ("0" + today.getDate()).substr(-2);

  return (
    <ContainerFormCreateTrip>
    <BtnShowCreateTrip onClick={()=> ShowHide()}> CRIAR UMA VIAGEM </BtnShowCreateTrip>
    { show ? 
    <Form onSubmit={createTrip}>
      
     
      <input
        required
        placeholder='Nome'
        name='name'
        onChange={onChange}
        value={form.name}
        pattern={"^.{5,}$"}
        title={"Minimum 5 characters"}
      />
        <select required name='planet' value={form.planet} onChange={onChange}>
        <option value=''>Escolha um Planeta da lista</option>
        <option value='Mercurio'>Mercúrio</option>
        <option value='Venus'>Venus</option>
        <option value='Terra'>Terra</option>
        <option value='Marte'>Marte</option>
        <option value='Jupiter'>Jupiter</option>
        <option value='Saturno'>Saturno</option>
        <option value='Urano'>Urano</option>
        <option value='Netuno'>Netuno</option>
        <option value='Plutao'>Plutão</option>
      </select>
     <input
        placeholder='Data'
        name='date'
        onChange={onChange}
        value={form.date}
        type='date'
        min={minToday}
      />
          <input
        placeholder='Descrição'
        name='description'
        onChange={onChange}
        value={form.description}
        pattern={"^.{30,}$"}
        title={"Minimum 30 characters"}
      />
        <input
        placeholder='Duração em Dias'
        name='durationInDays'
        onChange={onChange}
        value={form.durationInDays}
        type='number'
        min='50'
      />
      <button type='submit'>CRIAR</button>
    </Form> :null
  } 
    </ContainerFormCreateTrip>
  );
};

export default CreateTripPage;

// CSS STYLED COMPONENTS

const BtnShowCreateTrip = styled.button`
display:flex;
flex-direction:column;
align-items:center;
width: clamp(100px, 90%, 500px);
height:50px;
background-color: rgba(30, 31, 33, 0.8);
font-weight: 900;
color: #f9f9f9;
align-self: center;
font-size: 1.8rem;
cursor: pointer;
border-top: 2px solid #eceff2;
border-left: 2px solid #eceff2;
:hover {
      background-color: rgba(72, 32, 125, 0.7);
      transition: all 0.4s ease;
}
@media (max-width: 800px) {
  font-size: 1.1rem;
    height: 30px;
  }
`;

const ContainerFormCreateTrip = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: clamp(300px, 80%, 600px);
   height:clamp(450px, 80%, 900px);
   
  
`;



const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  background-color: rgba(250, 252, 255, 0.2);
  box-shadow: inset 0 0 1em silver;
  padding: 2%;
  border-radius: 10px;
  @keyframes entrace {
  
  0%{
      transform: translateX(0px) translateY(-80px);
      opacity: 1;
    }
  100%{
      transform: translateX(0px)  translateY(0px);
      opacity: 1;
  }
}
animation: entrace 1s;

  select {
    font-size: 1.4rem;
    margin: 1%;
    width: 100%;
    border-radius: 10px;
    background-color: #313131;
    color: white;
  }

  input {
    font-size: 1.4rem;
    margin: 1%;
    width: 100%;
    border-radius: 10px;
    background-color: #313131;
    color: white;
    ::placeholder {
      font-size: 0.9rem;
      color: white;
    }
  }
  button {
    width: clamp(50px, 30%, 200px);
    height: 40px;
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
  }
`;
