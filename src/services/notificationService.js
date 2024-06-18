import { auth } from '../firebaseConfig';
import { get, post } from './api';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmailNotification = async (to, subject, text) => {
  const msg = {
    to,
    from: 'your-email@example.com', // Use your verified sender
    subject,
    text,
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent');
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export const createInAppNotification = async (contentId, message) => {
  try {
    await post('/notifications', { contentId, message });
  } catch (error) {
    console.error('Error creating in-app notification:', error);
  }
};

export const getInAppNotifications = async () => {
  try {
    return await get('/notifications');
  } catch (error) {
    console.error('Error fetching in-app notifications:', error);
    return [];
  }
};