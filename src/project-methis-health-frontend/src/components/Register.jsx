import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  //   async function handleSendMessage(event) {
//     event.preventDefault();
//     if (username && newMessage) {
//       await project_methis_health_backend.send_message(username, newMessage);
//       setNewMessage('');
//       const fetchedMessages = await project_methis_health_backend.get_messages();
//       setMessages(fetchedMessages);
//     }
//   }

  // const handleRegister = async (event) => {
  //   event.preventDefault();

  //   console.log(event.target.value);
  //   const principal = await project_methis_health_backend.register_user(event.target.value);
  //   console.log(principal);
  //   if (principal) {
  //     localStorage.setItem('principal', principal);
  //     navigate('/chat');
  //   }
  // };

  return (
    <div>
      <h1>Register</h1>
      {/* <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
      />
      <button onClick={handleRegister}>Register</button> */}
    </div>
  );
}

export default Register;