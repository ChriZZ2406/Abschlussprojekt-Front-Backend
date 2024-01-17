import React, { useState } from 'react';
import '../newacc.css'; 

// Funktionale Komponente für die Account-Erstellung
const AccountErstellung = () => {
  // State-Hooks für die Eingabefelder
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  // Funktion zum Verarbeiten des Formulars (kann entsprechend erweitert werden)
  const handleCreateAccount = () => {
    // Logik für die Account-Erstellung implementieren
    console.log('Account erstellen:', { username, email, password, passwordRepeat });
  };

  return (
    <div className="account-erstellung-container">
      <img src="https://cdn.discordapp.com/attachments/1195301143161606205/1195301598507827240/techst_logo_rz_white.png?ex=65b37e5c&is=65a1095c&hm=951cba6cabd865ab2f4e7c4fd8e295c18bb4f3b9a3474d434849184a84fcbd48&" alt="Logo" className="logo" />

      <div className="eingabefelder">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Mailadresse"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Passwort wiederholen"
          value={passwordRepeat}
          onChange={(e) => setPasswordRepeat(e.target.value)}
        />
      </div>

      <button onClick={handleCreateAccount}>Account erstellen</button>
    </div>
  );
};

export default AccountErstellung;
