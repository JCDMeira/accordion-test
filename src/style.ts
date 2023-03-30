import styled from 'styled-components';

export const Conteiner = styled.div`
  display: flex;
  justify-content: center;

  height: 100vh;
  padding-top: 90px;

  label {
    display: block;
  }

  button {
    min-width: 80px;
    height: 40px;
    border-radius: 8px;
    border: none;
    background-color: #395cb0;
    color: #fff;
  }
  button:disabled {
    background-color: #8c8c8c;
  }
`;

export const ErrorMessage = styled.span`
  color: tomato;
  display: block;
  margin: 8px;
`;
