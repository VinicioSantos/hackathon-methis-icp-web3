
import React from "react";
import LoggedOut from "./LoggedOut";
import { useAuth, AuthProvider } from "./use-auth-client";
import "./assets/main.css";
import LoggedIn from "./LoggedIn";
import Chat from "./components/Chat";

function App() {
  const { isAuthenticated, identity } = useAuth();
  return (
    <>
      <header id="header">
        <section id="status" className="toast hidden">
          <span id="content"></span>
          <button className="close-button" type="button">
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </section>
      </header>
      {
        isAuthenticated ? <div><Chat /> </div> : <main id="pageContent">
          <LoggedOut />
        </main>
      }
    </>
  );
}

export default () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);




// import React, { useState, useEffect } from 'react';
// import { Actor, HttpAgent } from "@dfinity/agent";
// import { AuthClient } from "@dfinity/auth-client";
// import { project_methis_health_backend } from "../../declarations/project-methis-health-backend";

// const webapp_id = process.env.CANISTER_ID_PROJECT_METHIS_HEALTH_BACKEND;

// // The interface of the whoami canister
// const webapp_idl = ({ IDL }) => {
//   return IDL.Service({ whoami: IDL.Func([], [IDL.Principal], ["query"]) });
// };

// const App = () => {
//   const [iiUrl, setIiUrl] = useState('');
//   const [principal, setPrincipal] = useState('');

//   useEffect(() => {
//     let url;
//     if (process.env.DFX_NETWORK === "local") {
//       url = `http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943/#authorize`;
//     } else if (process.env.DFX_NETWORK === "ic") {
//       url = `https://${process.env.II_CANISTER_ID}.ic0.app`;
//     } else {
//       url = `https://${process.env.II_CANISTER_ID}.dfinity.network`;
//     }
//     setIiUrl(url);

    

//     console.log("II URL: ", iiUrl);

//     async function fetchMessages() {
//       const fetchedMessages = await project_methis_health_backend.whoami();
//       console.log('Fetched messages:', fetchedMessages);
//       // setPrincipal(fetchedMessages);

//       const authClient = await AuthClient.create();

//       console.log("AuthClient: ", authClient);

//     const identity = authClient.getIdentity();

//     console.log("Identity: ", identity);
//     const agent = new HttpAgent({ identity });

//       console.log("Agent: ", agent);

//     const webapp = Actor.createActor(webapp_idl, {
//       agent,
//       canisterId: webapp_id,
//     });

//     console.log("Webapp: ", webapp);
//     const principal = await webapp.whoami();

//     console.log("Principal: ", principal);
//     setPrincipal(principal.toText());
//     }

//     // Buscar mensagens ao carregar o componente
//     fetchMessages();
//   }, []);

//   const handleLogin = async () => {
//     const authClient = await AuthClient.create();

//     await new Promise((resolve, reject) => {
//       authClient.login({
//         identityProvider: iiUrl,
//         onSuccess: resolve,
//         onError: reject,
//       });
//     });

//     const identity = authClient.getIdentity();
//     const agent = new HttpAgent({ identity });
//     const webapp = Actor.createActor(webapp_idl, {
//       agent,
//       canisterId: webapp_id,
//     });

//     const principal = await webapp.whoami();
//     setPrincipal(principal.toText());
//   };

//   return (
//     <div>
//       <header>
//         <img src="logo2.svg" alt="DFINITY logo" />
//       </header>
//       <main>
//         <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
//           <button type="submit">Login!</button>
//         </form>
//         <section id="principal">
//           {principal && <p>Your principal is: {principal}</p>}
//         </section>
//       </main>
//     </div>
//   );
// };

// export default App;

// function App() {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');
//   const [username, setUsername] = useState('');

//   useEffect(() => {
//     // Função para buscar mensagens do backend
//     async function fetchMessages() {
//       const fetchedMessages = await project_methis_health_backend.get_messages();
//       setMessages(fetchedMessages);
//     }

//     // Buscar mensagens ao carregar o componente
//     fetchMessages();

//     // Intervalo para buscar mensagens periodicamente
//     const intervalId = setInterval(fetchMessages, 5000);
//     return () => clearInterval(intervalId);
//   }, []);

//   async function handleSendMessage(event) {
//     event.preventDefault();
//     if (username && newMessage) {
//       await project_methis_health_backend.send_message(username, newMessage);
//       setNewMessage('');
//       const fetchedMessages = await project_methis_health_backend.get_messages();
//       setMessages(fetchedMessages);
//     }
//   }

//   return (
//     <main>
//       <img src="/logo2.svg" alt="DFINITY logo" />
//       <br />
//       <br />
//       <form onSubmit={handleSendMessage}>
//         <label htmlFor="username">Username: &nbsp;</label>
//         <input
//           id="username"
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//         <br />
//         <label htmlFor="newMessage">Message: &nbsp;</label>
//         <input
//           id="newMessage"
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//         />
//         <button type="submit">Send</button>
//       </form>
//       <section id="chat">
//         {messages.map((msg, index) => (
//           <div key={index}>
//             <strong>{msg[0]}:</strong> {msg[1]}
//           </div>
//         ))}
//       </section>
//     </main>
//   );
// }

// export default App;