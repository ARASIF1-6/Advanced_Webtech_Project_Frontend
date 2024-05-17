"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import UpdateProduct from '../update_product/page';
import NavBar from '../components/navbar';
import Session from '../components/session';


export default function AddAddress() {
  const router = useRouter();
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');

  //const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const validationErrors = validateForm(formData);

    // if (Object.keys(validationErrors).length === 0) {
    try {

        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        if (token) {
          const response = await axios.post('http://localhost:3001/seller/address/' + username, {
            street: street,
            city: city
          }, { headers: {
            Authorization: `Bearer ${token}`},
          });
        

        toast.success('Address Registration Successfull');
        router.push('/Sales_Representatives/dashboard');

        } else {
          
        }
     
    } catch (error) {
        console.error('Error during signup:', error);
        toast.error('Signup failed. Please try again.');
    }
    // } else {
    //   setErrors(validationErrors);
    // }
  };

  return (
    <>
    <Session />
    <div className="max-w-md mx-auto mt-8">
        <div className="flex items-center justify-center gap-2 mt-3 mb-3">
            <h1 className="">Sign up</h1>
        </div>
        <Toaster />
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className=" flex items-center justify-center gap-2 mb-2">
                <input type="text" id="street" name="street" value={street} onChange={(e) => setStreet(e.target.value)} className="input input-bordered" placeholder="street" />
                {/* {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>} */}
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
                <input type="text" id="city"
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)} className="input input-bordered" placeholder="City" />
                {/* {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>} */}
            </div>
            <div className="flex justify-center">
                <button
                    type="submit"
                    className="btn btn-active">
                    Registration
                </button>
            </div>
        </form>
    </div>
</>
  );
};