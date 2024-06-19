import React, { useState, useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';

const Chat = ({ contentId }) => {
  const [message, setMessage] = useState('');
  const messagesRef = collection(db, 'messages');
  const [q, setQ] = useState(query(messagesRef, orderBy('createdAt')));

  useEffect(() => {
    setQ(query(messagesRef, orderBy('createdAt')));
  }, [contentId]);

  const [messages] = useCollectionData(q, {
    idField: 'id',
    refField: 'ref',
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, displayName } = auth.currentUser;
    await addDoc(messagesRef, {
      text: message,
      createdAt: serverTimestamp(),
      uid,
      displayName,
      contentId,
    });
    setMessage('');
  };

  return (
    <div className="chat" role="region" aria-label="Chat Section">
      <div className="messages" role="log" aria-live="polite">
        {messages && messages.map(msg => (
          <div key={msg.id} className={`message ${msg.uid === auth.currentUser.uid ? 'sent' : 'received'}`} role="article" tabIndex="0">
            <p><strong>{msg.displayName}</strong>: {msg.text}</p>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} role="form">
        <input 
          value={message} 
          onChange={(e) => setMessage(e.target.value)} 
          placeholder="Type a message" 
          aria-label="Type a message" 
          tabIndex="0" 
        />
        <button type="submit" tabIndex="0">Send</button>
      </form>
    </div>
  );
};

export default Chat;