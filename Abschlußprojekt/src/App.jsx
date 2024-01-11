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
        <img src="/pfad/zum/logo.png" alt="Logo" />
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
