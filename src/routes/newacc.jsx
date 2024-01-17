import React from 'react';
import './newacc.css';

// Man definiert eine Button-Komponente für die Erstellung eines neuen Kontos
const NewAccountButton = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      New Account
    </button>
  );
}


function App() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleCreateAccount = () => {
    console.log('Account erstellen:', { username, email, password, confirmPassword });
  };

  return (
    <div className="app">
      <div className="signup-container">
        <img src="dein-logo.png" alt="Logo" className="logo" />

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
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button onClick={handleCreateAccount}>Erstellen</button>
      </div>
    </div>
  );
}

export default NewAccountButton;
