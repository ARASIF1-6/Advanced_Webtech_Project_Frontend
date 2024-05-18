"use client";
import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();



    toast.success('Your message has been sent!');


    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Contact Us</h1>

      <div className="space-y-6">
        <p>
          We'd love to hear from you! Whether you have a question about our products, need assistance, or just want to say hello, please don't hesitate to get in touch.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
          >
            Send Message
          </button>
        </form>

        <h2 className="text-2xl font-semibold text-gray-800">Other Ways to Reach Us</h2>
        <p>
          You can also reach us at:
        </p>
        <ul className="list-disc list-inside ml-8">
          <li>**Email:** info@inventory.com</li>
          <li>**Phone:** +880 2341234-124</li>
        </ul>
      </div>
      <Toaster /> 
    </div>
  );
};

export default Contact;
