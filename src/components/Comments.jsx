import React, { useState, useEffect } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, addDoc, serverTimestamp, query, orderBy } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';

const Comments = ({ contentId }) => {
  const [comment, setComment] = useState('');
  const commentsRef = collection(db, 'comments');
  const [comments, setComments] = useState([]);
  
  useEffect(() => {
    const q = query(commentsRef, orderBy('createdAt'));
    const unsubscribe = useCollectionData(q, { idField: 'id' }).onSnapshot(snapshot => {
      const filteredComments = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(cmt => cmt.contentId === contentId);
      setComments(filteredComments);
    });
    return () => unsubscribe();
  }, [contentId]);

  const postComment = async (e) => {
    e.preventDefault();
    const { uid, displayName } = auth.currentUser;
    await addDoc(commentsRef, {
      text: comment,
      createdAt: serverTimestamp(),
      uid,
      displayName,
      contentId,
    });
    setComment('');
  };

  return (
    <div className="comments" role="region" aria-labelledby="comments-heading">
      <h2 id="comments-heading">Comments</h2>
      <div className="comments-list" role="list">
        {comments && comments.map(cmt => (
          <div key={cmt.id} className={`comment ${cmt.uid === auth.currentUser.uid ? 'own' : ''}`} role="listitem">
            <p><strong>{cmt.displayName}</strong>: {cmt.text}</p>
          </div>
        ))}
      </div>
      <form onSubmit={postComment} role="form">
        <input 
          value={comment} 
          onChange={(e) => setComment(e.target.value)} 
          placeholder="Add a comment" 
          aria-label="Add a comment"
          tabindex="0"
        />
        <button type="submit" tabindex="0">Post</button>
      </form>
      <style jsx>{`
        .comments {
          color: #000;
          background-color: #fff;
        }
        .comments-list {
          margin-bottom: 1em;
        }
        .comment {
          padding: 0.5em;
          border-bottom: 1px solid #ccc;
        }
        .comment.own {
          background-color: #e0f7fa;
        }
        input, button {
          margin: 0.5em 0;
          padding: 0.5em;
          border: 1px solid #000;
        }
        input:focus, button:focus {
          outline: 2px solid #000;
        }
      `}</style>
    </div>
  );
};

export default Comments;