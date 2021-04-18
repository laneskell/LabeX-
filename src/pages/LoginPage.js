import React from "react";
import axios from "axios";
import { TiArrowBackOutline } from "react-icons/ti";
import { useHistory } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import styled from "styled-components";
import { goToAdminHomePage, goToHomePage } from "../Routes/coordinator";
import { useProtectedLog } from "../hooks/useProtectedPage";
import { urlLogin } from "../Components/url-api";
import { useForm } from "../hooks/useForm";
import swal from "sweetalert";
import bcgroundmobile from "../img/bcgrounsmart.jpg"

const initialForm = {
  email: "",
  password: "",
};
const LoginPage = () => {
  const history = useHistory();
  useProtectedLog();
  const [form, onChange] = useForm(initialForm);

  const login = (event) => {
    event.preventDefault();
    const body = {
      email: form.email,
      password: form.password,
    };
    axios
      .post(urlLogin, body)
      .then((res) => {
        window.localStorage.setItem("token", res.data.token);
        goToAdminHomePage(history);
        swal(`Bem Vindo!`, "Você tem acesso para criar/excluir viagens, e aprovar ou reprovar os candidatos", "success")
      })
      .catch((err) => {
        swal("Oops", "E-mail ou Senha incorretos, preencha os dados corretamente!", "error");
      });
  };

  return (
    <LoginPageApp>
      <HeaderContainerListPage>
        <BackPage onClick={() => goToHomePage(history)}>
          <TiArrowBackOutline />
        </BackPage>
        <Header />
      </HeaderContainerListPage>
      <MainLogin>
        <Login onSubmit={login}>
          <h2>Login</h2>
          <input
            required
            name='email'
            placeholder='Email'
            value={form.email}
            onChange={onChange}
            pattern={"[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"}
            title={"Invalid e-mail"}
          ></input>
          <input
            required
            name='password'
            placeholder='Password'
            value={form.password}
            onChange={onChange}
            type='password'
          ></input>
          <button type='submit'>Login</button>
          <p>Área Administrativa</p>
        </Login>
      </MainLogin>
      <Footer />
    </LoginPageApp>
  );
};

export default LoginPage;

// CSS STYLED COMPONENTS =>

const LoginPageApp = styled.div`
`;
const HeaderContainerListPage = styled.div`
  display: grid;
  grid-template-columns: 1fr 7fr 2fr;
  width: 100vw;
  background-color: rgba(250, 252, 255, 0.4);
  button {
    margin: 10%;
    width: 60%;
    height: 30%;
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
const MainLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  height:75vh;
`;
const Login = styled.form`
 display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  gap: 5%;
  justify-content: center;
  width: clamp(300px, 20%, 600px);
  height: clamp(300px, 60%, 800px);
  padding: 3%;
  margin-top:5%;
  background-color: rgba(250, 252, 255, 0.1);
  box-shadow: inset 0 0 1em silver;
  border-radius: 50px;
  background-image: url(${bcgroundmobile});
background-repeat: no-repeat;
background-size: cover;
  h2{

  }
  input {
    font-size: 1.4rem;
    margin: 1%;
    width: 80%;
    border-radius: 10px;
    background-color: #313131;
    color: white;
    ::placeholder {
      font-size: 0.9rem;
      color: white;
    }
  }
  button {
    width: clamp(100px, 50%, 450px);
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
  }
`;
