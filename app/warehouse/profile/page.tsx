
"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import TopBar from '../components/topbar/page';

interface User {
    warehouseId: string;
    name: string;
    email: string;
    username: string;
    address: string;
    filename: string
}

export default function Profile() {

    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [emailInput, setEmailInput] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token');
                const email = localStorage.getItem('email');
                if (token) {
                    const response = await axios.get('http://localhost:3008/warehouse/getusers/' + email, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    setUser(response.data);
                    setEmailInput(response.data.email);
                } else {
                    router.push('/warehouse/signin');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                router.push('/warehouse/signin');
            }
        };

        fetchUserData();
    }, [router]);

    // const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setEmailInput(e.target.value);
    // };

    if (!user) {
        return <div></div>;
    }

    const update = () => {
        router.push('/warehouse/updateProfile');
    }

    return (
        <>
            <TopBar />
            <div className='flex justify-center items-center h-screen'>
                <div className="card w-96 bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img src={'http://localhost:3008/warehouse/getimage/' + user.filename} alt="Shoes" className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">ID: {user.warehouseId}</h2>
                        Name: {user.name} <br />
                        UserName: {user.username} <br />
                        email: {user.email} <br />
                        Address: {user.address} <br />
                        {/* <input type="text" value={emailInput} onChange={handleEmailChange} /> */}
                        <div className="card-actions">
                            <button onClick={update} className="btn btn-primary">Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}