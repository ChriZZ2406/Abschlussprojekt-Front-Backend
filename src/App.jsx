import React from 'react';
import LoginButton from './LoginButton';
import NewAccountButton from './NewAccountButton';
import './App.css';

function App() {
  // Man definiert die Funktion für den Login-Button
  const handleLoginClick = () => {
    // Die Logik für die Authentifizierung käme hier hin
  };

  // Man definiert die Funktion für den New Account-Button
  const handleNewAccountClick = () => {
    // Die Logik für das Erstellen eines neuen Kontos käme hier hin
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* Man fügt das Logo hier ein */}
        <img src="https://cdn.discordapp.com/attachments/1195301143161606205/1195301598507827240/techst_logo_rz_white.png?ex=65b37e5c&is=65a1095c&hm=951cba6cabd865ab2f4e7c4fd8e295c18bb4f3b9a3474d434849184a84fcbd48&" alt="Logo" className="logo" />
      </header>
      <div className="App-body">
        {/* Man fügt die Buttons für Login und Account-Erstellung hinzu */}
        <LoginButton onClick={handleLoginClick} />
        <NewAccountButton onClick={handleNewAccountClick} />
      </div>
    </div>
  );
}

export default App;
