import React, { useEffect, useState } from 'react';
import { project_methis_health_backend } from '../../../declarations/project-methis-health-backend';
import { useAuth } from "../use-auth-client";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');
  const [IdentityId, setIdentityId] = React.useState("");
  const { whoamiActor, logout } = useAuth();

  useEffect(() => {
    // Função para buscar mensagens do backend
    async function fetchMessages() {
      const fetchedMessages = await project_methis_health_backend.get_messages();
      setMessages(fetchedMessages);
    }

    async function getIdentity() {
      const whoami = await whoamiActor.whoami();
      console.log(whoami);
      setIdentityId(whoami);

      
      const regist = await project_methis_health_backend.register_user(whoami, username);
      console.log(regist.isAnonymous());
    }

    getIdentity();

    // Buscar mensagens ao carregar o componente
    fetchMessages();

    // Intervalo para buscar mensagens periodicamente
    const intervalId = setInterval(fetchMessages, 500);
    return () => clearInterval(intervalId);
  }, []);

  async function handleSendMessage(event) {
    event.preventDefault();
    if (username && newMessage) {
      await project_methis_health_backend.send_message(username, newMessage);
      setNewMessage('');
      const fetchedMessages = await project_methis_health_backend.get_messages();
      setMessages(fetchedMessages);
    }
  }

  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
      <br />
      <br />
      <form onSubmit={handleSendMessage}>
        <label htmlFor="username">Username: &nbsp;</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label htmlFor="newMessage">Message: &nbsp;</label>
        <input
          id="newMessage"
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
      <section id="chat">
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg[0]}:</strong> {msg[1]}
          </div>
        ))}
      </section>
    </main>
  );
}

export default Chat;

