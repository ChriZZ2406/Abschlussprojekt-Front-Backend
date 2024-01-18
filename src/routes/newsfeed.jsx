import React, { useState } from 'react';
import Chat, { NewsFeed } from './chat';
import Login from './login';
import '../newsfeed.css';

/*function newsfeed() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user) => {
    setLoggedIn(true);
    setCurrentUser(user);
  };*/

  const handleLogout = () => {
    setLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <div className="newsfeed-container">
      <div className="login-panel">
        {isLoggedIn ? (
          <div>
            <p>Eingeloggt als: {currentUser}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </div>
      <div className="main-content">
        <NewsFeed />
        <Chat />
      </div>
    </div>
  );
}

export default NewsFeed;
