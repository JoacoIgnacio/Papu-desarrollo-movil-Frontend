import styled from 'styled-components';

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 1000px;
  margin: 20px auto;
  padding: 20px; 
  border-radius: 10px;
  background-color: #f9f9f9;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  background-color: #f5f5f5;
  height: 80vh; /* Establece una altura fija para el formulario */
  overflow-y: auto; /* Permite el scroll si el contenido excede el espacio */
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  width: 100%;
  padding: 10px 0;
  border-bottom: 1px solid #e0e0e0;
`;

export const Label = styled.label`
  flex: 1;
  font-size: 18px;
  color: #444444;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Input = styled.input`
  margin-left: 10px;
`;

export const CheckboxContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

export const Textarea = styled.textarea`
  width: 100%;
  margin-top: 10px;
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: vertical;
  font-size: 14px;
  background-color: #f9f9f9;
`;

export const Button = styled.button`
  padding: 15px;
  background-color: #ff477e;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  
  &:hover {
    background-color: #ff3366;
  }
`;
