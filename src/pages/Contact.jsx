import React from 'react';

const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <h1 className="text-5xl font-bold mb-4 text-black">Contact Page</h1>
      <p className="text-xl mb-8 text-black">Get in touch with us on this page.</p>
      <img src="contact-image.jpg" alt="Contact us" className="mb-4" />
      <button className="px-4 py-2 bg-blue-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-400" tabindex="0" role="button">
        Send Message
      </button>
    </div>
  );
};

export default Contact;