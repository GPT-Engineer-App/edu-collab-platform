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
    <div className="comments">
      <div className="comments-list">
        {comments && comments.map(cmt => (
          <div key={cmt.id} className={`comment ${cmt.uid === auth.currentUser.uid ? 'own' : ''}`}>
            <p><strong>{cmt.displayName}</strong>: {cmt.text}</p>
          </div>
        ))}
      </div>
      <form onSubmit={postComment}>
        <input value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add a comment" />
        <button type="submit">Post</button>
      </form>
    </div>
  );
};

export default Comments;