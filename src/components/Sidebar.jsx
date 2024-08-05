import React, { useContext, useEffect } from 'react';
import '../styles/Sidebar.css';
import data from '../assets/data';
import { ChatContext } from '../context/ChatContext';

export default function Components() {
   const { messages, setMessages } = useContext(ChatContext);

   const toggleNewchat = () => {
      console.log("New chat");

      if (messages.length > 0) {
         const history = JSON.parse(localStorage.getItem('history')) || [];
         const newMessage = messages.map(({ type, response }) => ({ type, response }));
         const nextIndex = history.length + 1;

         // Push new message into history and save it
         history.push({ index: nextIndex, messages: newMessage });
         localStorage.setItem('history', JSON.stringify(history));

         // Clear messages after storing
         setMessages([]);
      } else {
         console.log("No messages to store");
      }
   };

   // Retrieve and parse history once
   const history = JSON.parse(localStorage.getItem('history')) || [];

   // Extract user responses for rendering
   const userResponsesHistory = history.map(({ messages }) =>
      messages.filter(({ type }) => type === 'user').map(({ response }) => response)
   );

   return (
      <div className="sidebar_container">
         <div className="sidebar_container_icons">
            <img src={data.sidebar} alt="" />
            <img src={data.newchat} alt="" />
         </div>
         <div
            className="sidebar_container_newchat sidebar_container_toggle_style"
            onClick={toggleNewchat}
         >
            <p>New chat</p>
            <img src={data.add} alt="" />
         </div>
         <div className="history_container_section">
            {userResponsesHistory.map((userResponses, index) => (
               <div key={index} className="sidebar_container_history sidebar_container_toggle_style">
                  {userResponses.map((response, idx) => (
                     <p key={idx}>{response}</p>
                  ))}
                  <button>
                     <img src={data.remove} alt="" />
                  </button>
               </div>
            ))}
         </div>
         <div className="sidebar_container_userprofile sidebar_container_toggle_style">
            <img src={data.user} alt="" />
            <p>Buddhadeb Koner</p>
         </div>
      </div>
   );
}
