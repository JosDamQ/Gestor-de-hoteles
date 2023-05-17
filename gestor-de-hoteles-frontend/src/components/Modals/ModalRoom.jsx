import React, { useState } from 'react'
import styled from "styled-components";

export const ModalRoom = ({children, titleModal, showModalRoom, setShowModalRoom}) => {

  const [form, setForm] = useState({})


  const handleChange = (e)=>{
    setForm({
      ...form, 
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
        {showModalRoom && <Overlay>
        <ContenedorModal>
          <EncabezadoModal>
            <TituloEncabezado>{titleModal}</TituloEncabezado>
          </EncabezadoModal>
          <BotonCerrar onClick={()=>setShowModalRoom(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </BotonCerrar>
          <FormAddAnimal>
            {children}
          </FormAddAnimal>
        </ContenedorModal>
      </Overlay>}
    </>
  )
}

const FormAddAnimal = styled.form`
  text-align: center;
  z-index: 304;
`
const Input = styled.input`
  margin-bottom: 10px;
  font-size: 18px;
  width: 100%;
  padding: 10px;
  outline: none;
  border: 1px solid #9b9b9b;
  color: #3e4144
  background: silver;
  border: 1px solid #393939;
  border-radius: 5px 5px 5px 5px;
  color: #393939;
  font-size: 12px;
  padding: 5px;
`

const User = styled.select`
  font-size: 15px;
  width: 100%;
  height: 35px;
  margin-bottom: 10px;
  outline: none
  background: silver;
   border: 1px solid #393939;
   border-radius: 5px 5px 5px 5px;
   color: #393939;
   font-size: 12px;
   padding: 5px;
`

const AddBoton = styled.input`
  font-size: 18px;
  width: 50%;
  padding: 10px;
  outline: none;
  border: 1px solid #9b9b9b;
  color: #3e4144;
  background: none;
  border-radius: 5px;
`

const Overlay = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

const ContenedorModal = styled.div`
  width: 500px;
  background: #fff;
  position: relative;
  border-radius: 5px;
  box-shadow: rgba(100, 100, 111, 0.2) 0 7px 29px 0;
  padding: 20px;
`;

const EncabezadoModal = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e8e8e8;
`;

const TituloEncabezado = styled.h2`
  color: black;
`;
const BotonCerrar = styled.button`
  position: absolute;
  right: 20px;
  top: 11px;
  height: 30px;
  width: 30px;
  border: none;
  font-size: 20px;
  transition: all 0.3s ease;
  border-radius: 5px;
  color: #1766dc;
  background: none;

  &:hover {
    background: #f2f2f2;
  }

  svg{
    width: 100%;
    height: 100%;
  }
`;
