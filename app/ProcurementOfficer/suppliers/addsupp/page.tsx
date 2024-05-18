// app/addsupplier/page.tsx
"use client";

import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import axios from 'axios';
import Link from 'next/link'; // Add this import

const AddSupplier: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    contactPerson: '',
    email: '',
    phoneNumber: '',
    address: '',
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/suppliers', formData);
      console.log('Supplier created:', response.data);
      toast.success('Supplier created successfully');
      // Optionally, redirect to the supplier list page after successful creation
    } catch (error) {
      console.error('Error creating supplier:', error);
      toast.error('An error occurred while creating the supplier');
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto p-8 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-semibold text-gray-800">
          Add New Supplier
        </h1>
        <Link href="/suppliers" className="text-blue-500 hover:underline"> 
          Go Back to Suppliers
        </Link> 
      </div>
      <Toaster />
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Input */}
        <div>
          <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        {/* Contact Person Input */}
        <div>
          <label htmlFor="contactPerson" className="block text-gray-700 text-sm font-bold mb-2">
            Contact Person
          </label>
          <input
            type="text"
            id="contactPerson"
            name="contactPerson"
            value={formData.contactPerson}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        {/* Email Input */}
        <div>
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        {/* Phone Number Input */}
        <div>
          <label htmlFor="phoneNumber" className="block text-gray-700 text-sm font-bold mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        {/* Address Input */}
        <div>
          <label htmlFor="address" className="block text-gray-700 text-sm font-bold mb-2">
            Address
          </label>
          <input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
        >
          Create Supplier
        </button>
      </form>
    </div>
  );
};

export default AddSupplier;
