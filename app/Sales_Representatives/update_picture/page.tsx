"use client"

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Session from '../components/session';
 
export default function UpdateProfile() {

    const router = useRouter();
    const [fileInput, setFileInput] = useState('');

    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:3001/seller/update_profilePic/' + username, {
                 filename:fileInput//}, {

            //     headers: {

            //         Authorization: `Bearer ${token}`,

            //     },

             });
        
            toast.success('Update successful!');
            router.push('/Sales_Representatives/show_profile');
     
        } catch (error) {
           console.error('Error during update:', error);
           toast.error('Update failed. Please try again.');
        }
    // } else {
    //   //setErrors(validationErrors);
    // }
    }
 
    const handleFileInputChange = (e: any) => {

        setFileInput(e.target.files[0]);
    }

    return (

        <>
        <Session />

    <div className="max-w-md mx-auto mt-8">
        <div className="flex items-center justify-center gap-2 mt-3 mb-3">
            <h1 className="">Update Picture</h1>
        </div>
        <Toaster />
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className=" flex items-center justify-center gap-2 mb-2">
                <input type="file" id="myfile"
                    name="myfile"
                    onChange={handleFileInputChange} className="file-input file-input-bordered file-input-sm w-full max-w-xs" />
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

}