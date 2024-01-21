import React, { useState } from 'react';
import '../newsfeed.css';

const UserProfile = ({ username }) => (
  <div className="user-profile">
    <img src="default-profile-picture.jpg" alt={`${username}'s profile`} />
    <p>{username}</p>
  </div>
);

const Reactions = ({ reactions }) => (
  <div className="reactions">
    {reactions.map((reaction, index) => (
      <span key={index}>{reaction.emoji} by {reaction.username}</span>
    ))}
  </div>
);

const App = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [images, setImages] = useState([]);
  const [username, setUsername] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() !== '' && username.trim() !== '') {
      setMessages([...messages, { text: newMessage, username: username, timestamp: Date.now() }]);
      setNewMessage('');
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImages([...images, { image: reader.result, username: username }]);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="app">
      <img src="https://cdn.discordapp.com/attachments/1195301143161606205/1195301598507827240/techst_logo_rz_white.png?ex=65b37e5c&is=65a1095c&hm=951cba6cabd865ab2f4e7c4fd8e295c18bb4f3b9a3474d434849184a84fcbd48&" alt="Logo" className="logo" />
      <div className="chat">
        <div className="messages">
          {messages.slice(-3).map((message, index) => (
            <div key={index} className="message">
              <UserProfile username={message.username} />
              <p>{message.text}</p>
              {message.timestamp && <p>Posted at: {new Date(message.timestamp).toLocaleTimeString()}</p>}
              <Reactions reactions={message.reactions || []} />
            </div>
          ))}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
            id="fileInput"
          />
          <label htmlFor="fileInput" className="upload-button">Upload Image</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default App;