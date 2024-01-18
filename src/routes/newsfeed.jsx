// newsfeed.jsx
import React, { useState } from 'react';
import '../newsfeed.css';

const App = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { text: newMessage }]);
      setNewMessage('');
    }
  };
  const UserInfo = ({ user }) => (
    <div className="user-info">
      {user.name} ({user.abbreviation})
    </div>
   );

   {messages.map((message, index) => (
    <div key={index} className="message">
      <UserInfo user={message.user} />
      {message.text}
    </div>
   ))}
   
   
  return (
    <div className="app">
      <img src="https://cdn.discordapp.com/attachments/1195301143161606205/1195301598507827240/techst_logo_rz_white.png?ex=65b37e5c&is=65a1095c&hm=951cba6cabd865ab2f4e7c4fd8e295c18bb4f3b9a3474d434849184a84fcbd48&" alt="Logo" className="logo" />
      <div className="chat">
        <div className="messages">
          {messages.map((message, index) => (
            <div key={index} className="message">
              {message.text}
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default App;
