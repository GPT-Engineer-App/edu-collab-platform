import { auth } from '../firebaseConfig';
import { collection, addDoc, serverTimestamp, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmailNotification = async (to, subject, text) => {
  const msg = {
    to,
    from: 'your-email@example.com', // Use your verified sender
    subject,
    text,
  };
  await sgMail.send(msg);
};

const createInAppNotification = async (contentId, message) => {
  const notificationsRef = collection(db, 'notifications');
  await addDoc(notificationsRef, {
    contentId,
    message,
    createdAt: serverTimestamp(),
    uid: auth.currentUser.uid,
  });
};

const getInAppNotifications = async (uid) => {
  const notificationsRef = collection(db, 'notifications');
  const q = query(notificationsRef, where('uid', '==', uid));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => doc.data());
};

export { sendEmailNotification, createInAppNotification, getInAppNotifications };