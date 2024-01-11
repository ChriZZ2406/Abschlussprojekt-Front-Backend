import React from 'react';

// Man definiert eine Button-Komponente für die Erstellung eines neuen Kontos
const NewAccountButton = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      New Account
    </button>
  );
}

export default NewAccountButton;
