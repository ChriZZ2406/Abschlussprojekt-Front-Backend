import React from 'react';
import LoginButton from '../LoginButton';
import '../App.css';

function Root() {
  // Diese Funktion wird aufgerufen, wenn der Benutzer auf "Login with Google" klickt
  const handleGoogleLoginClick = () => {
    window.location.href = "https://accounts.google.com/o/oauth2/v2/auth?scope=openid email&include_granted_scopes=true&response_type=token&state=state_parameter_passthrough_value&redirect_uri=http://localhost:5173/login/google&client_id=524319842420-0kk4ugtrf9mb5rs16mvs97guldts9iqo.apps.googleusercontent.com";
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* Logo hier */}
        <img src="https://cdn.discordapp.com/attachments/1195301143161606205/1195301598507827240/techst_logo_rz_white.png?ex=65b37e5c&is=65a1095c&hm=951cba6cabd865ab2f4e7c4fd8e295c18bb4f3b9a3474d434849184a84fcbd48&" alt="Logo" className="logo" />
      </header>
      <div className="App-body">
        {/* Button für Login mit Google */}
        <LoginButton onClick={handleGoogleLoginClick} />
      </div>
    </div>
  );
}

export default Root;
