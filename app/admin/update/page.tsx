"use client"

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Session from '../components/session';
import Link from 'next/link';
 
interface User {

    name: string;
    email: string;
    address: string;
    filename: string

}
 
export default function UpdateProfile() {

    const router = useRouter();

    const [user, setUser] = useState<User | null>(null);

    const [nameInput, setNameInput] = useState('');
    const [AddressInput, setAddressInput] = useState('');

    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
 
    useEffect(() => {

        const fetchUserData = async () => {

            try {

                if (token) {

                    const response = await axios.get('http://localhost:8000/admin/show_profile/' + email, {

                        headers: {

                            Authorization: `Bearer ${token}`,

                        },

                    });

                    setUser(response.data);

                    setNameInput(response.data.name);
                    setAddressInput(response.data.address);

                } else {

                    router.push('/admin/signin');

                }

            } catch (error) {

                console.error('Error fetching user data:', error);

                router.push('/admin/signin');

            }

        };
 
        fetchUserData();

    }, [router]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:8000/admin/update_profile/' + email, {
                name:nameInput,
                address:AddressInput}, {

                headers: {

                    Authorization: `Bearer ${token}`,

                },

            });
        
            toast.success('Update successful!');
            router.push('/admin/dashboard');
     
        } catch (error) {
           console.error('Error during update:', error);
           toast.error('Update failed. Please try again.');
        }
    }
 
    const handleNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setNameInput(e.target.value);
    }

    const handleAddressInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddressInput(e.target.value);

    };
 
    return (

      <>
        <Session />

    <div className="max-w-md mx-auto mt-8">
        <div className="flex items-center justify-center gap-2 mt-3 mb-3">
            <h1 className="">Update Profile</h1>
        </div>
        <Toaster />
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className=" flex items-center justify-center gap-2 mb-2">
                 <input type="text" id="name" name="name" value={nameInput} onChange={handleNameInputChange} className="input input-bordered" placeholder="name" />
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
                <input type="text" id="email"
                    name="email"
                    value={user?.email}
                    className="input input-bordered" placeholder="Email" />
            </div>
            <div className=" flex items-center justify-center gap-2 mb-2">
                <input type="address" id="address"
                    name="address"
                    value={AddressInput}
                    onChange={handleAddressInputChange} className="input input-bordered" placeholder="Address" />
            </div>
            <div className=" flex items-center justify-center gap-2 mb-2">
                <img className="p-8 rounded-t-lg" src={'http://localhost:8000/admin/getimage/' + user?.filename} alt="Image not found" />
            </div>          
            <div className="flex gap-2 justify-center">
                <button
                    type="submit"
                    className="btn btn-active">
                    Update
                </button>
            </div>
        </form>
    </div>

    </>

    );

}