import React from "react";
import {
  ImFacebook2,
  ImWhatsapp,
  ImInstagram,
  ImTwitter,
} from "react-icons/im";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterContainer>
      <div>
        <a  rel="noreferrer" href='https://www.instagram.com/' target='_blank'>
          {" "}
          <ImInstagram />
        </a>

        <a rel="noreferrer" href='https://www.twitter.com/'target='_blank' >
          {" "}
          <ImTwitter />
        </a>

        <a rel="noreferrer"  href='https://www.whatsapp.com/'target='_blank'>
          {" "}
          <ImWhatsapp />
        </a>

        <a rel="noreferrer"  href='https://www.facebook.com/' target='_blank'>
          <ImFacebook2 />
        </a>
      </div>
      <h4>Labe X</h4>
      <h6>Av. do Futuro, 2050.</h6>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: clamp(100px, 100vw, 100vw);
  height: 10vh;
  justify-items: center;
  align-items: center;
  text-decoration:none; 
  background-color: rgba(250, 252, 255, 0.1);
  div {
    display: flex;
    flex-direction: row;
    gap: 10%;
    width: clamp(30px, 30vw, 90%);
    margin-left: 30%;
    a{
        text-decoration:none; 
        color:white;
        :hover{
    transform: scale(2.3);
    transition: all 0.3s ease-in;
    }
    }
  }


`;
