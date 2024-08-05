import React, { useContext, useEffect } from 'react';
import '../styles/Sidebar.css';
import data from '../assets/data';
import { ChatContext } from '../context/ChatContext';

export default function Components() {
   const { messages, setMessages, isBtnActive } = useContext(ChatContext);

   // Retrieve history from local storage
   const getHistory = () => {
      return JSON.parse(localStorage.getItem('history')) || [];
   };

   // Save history to local storage
   const saveHistory = (history) => {
      localStorage.setItem('history', JSON.stringify(history));
   };

   const toggleNewchat = () => {
      console.log("New chat");
      if (isBtnActive) {
         if (messages.length > 0) {
            const newMessage = messages.map(({ type, response }) => ({ type, response }));
            const history = getHistory();
            const nextIndex = history.length ? Math.max(history.map(item => item.index)) + 1 : 1;

            // Push new message into history and update local storage
            const updatedHistory = [...history, { index: nextIndex, messages: newMessage }];
            saveHistory(updatedHistory);

            // Clear messages after storing
            setMessages([]);
         } else {
            console.log("No messages to store");
         }
      } else {
         console.log("API request in progress");
      }
   };

   const handelHistoryDelete = (index) => {
      console.log(index);

      // Retrieve history from local storage, remove the item at the specified index, and update local storage
      const history = getHistory();
      const updatedHistory = history.filter(item => item.index !== index);
      saveHistory(updatedHistory);
   };

   // Extract user responses for rendering
   const userResponsesHistory = getHistory().map(({ messages }) =>
      messages.filter(({ type }) => type === 'user').map(({ response }) => response)
   );

   return (
      <div className="sidebar_container">
         <div className="sidebar_container_icons">
            <button type='button'>
               <img src={data.sidebar} alt="" />
            </button>
            <button
               type='button'
               onClick={toggleNewchat}
            >
               <img src={data.newchat} alt="" />
            </button>
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
                  <button
                     type='button'
                     className='removebtn'
                     onClick={() => handelHistoryDelete(getHistory()[index].index)}
                  >
                     <img src={data.remove} alt="Remove" />
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
