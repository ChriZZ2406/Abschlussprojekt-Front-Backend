import React, { useState } from 'react';
import '../newsfeed.css';

const NewsFeed = () => {
  const [selectedFile, setSelectedFile] = useState();
 
  const handleFileInput = (event) => {
   setSelectedFile(event.target.files[0]);
  }
 
  const handleUpload = () => {
   if (!selectedFile) {
     alert("Please select a file.");
     return;
   }
 
   // Handle the upload process here
   console.log(`Uploading ${selectedFile.name}`);
  }
 
  return (
     <div>
         <input type="file" onChange={handleFileInput} style={{display: 'none'}} id="fileInput"/>
         <label htmlFor="fileInput" className="upload-button">Upload</label>
         <h2>Upload Button</h2>
     </div>
  );
 }
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
 const [images, setImages] = useState([]); // New state variable for images
 const [username, setUsername] = useState(''); // New state variable for username

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
      {messages.map((message, index) => (
        <div key={index} className="message">
          <UserProfile username={message.username} />
          <p>{message.text}</p>
          {message.timestamp && <p>Posted at: {new Date(message.timestamp).toLocaleTimeString()}</p>}
          <Reactions reactions={message.reactions || []} />
        </div>
      ))}
      {images.map((imageObj, index) => (
        <div key={index} className="uploaded-image">
          <p>{imageObj.username}</p>
          <img src={imageObj.image} alt="" />
        </div>
      ))}
    </div>
    <div className="input-container">
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
      />
      <input type="file" accept="image/*" onChange={handleImageUpload} />
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
