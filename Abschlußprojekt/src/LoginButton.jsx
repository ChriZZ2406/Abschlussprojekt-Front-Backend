import React from 'react';

// Man definiert eine Button-Komponente für den Login
const LoginButton = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      Login
    </button>
  );
}

export default LoginButton;
