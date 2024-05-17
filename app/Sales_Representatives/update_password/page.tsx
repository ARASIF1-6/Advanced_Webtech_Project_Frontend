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
  const [password, setPassword] = useState('');

  //const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const validationErrors = validateForm(formData);

    // if (Object.keys(validationErrors).length === 0) {
    try {

        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');
        if (token) {
          const response = await axios.put('http://localhost:3001/seller/update_password/' + username, {
            password: password,
          }, { headers: {
            Authorization: `Bearer ${token}`},
          });
        

        toast.success('Password Updated');
        router.push('/Sales_Representatives/dashboard');

        } else {
          
        }
     
    } catch (error) {
        console.error('Error during password update:', error);
        toast.error('Password Updated failed. Please try again.');
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
            <h1 className="">Update Password</h1>
        </div>
        <Toaster />
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className=" flex items-center justify-center gap-2 mb-2">
                <input type="text" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input input-bordered" placeholder="Enter Password" />
                {/* {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>} */}
            </div>
            <div className="flex justify-center">
                <button
                    type="submit"
                    className="btn btn-active">
                    Save Changes
                </button>
            </div>
        </form>
    </div>
</>
  );
};