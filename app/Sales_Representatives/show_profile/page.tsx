'use client'
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Session from '../components/session';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface User {
    sellerId: number;
    name: string;
    email: string;
    number: string;
    position: string;
    username: string;
    filename: string
  }


export default function ShowProfile() {

    const [user, setUser] = useState<User | null>(null);


    useEffect(() => {
        const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('username');
            if (token) {
              const response = await axios.get('http://localhost:3001/seller/show_profile/' + username, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
    
              setUser(response.data);
              console.log(response.data);
            } else {
                
            }
        } 
        catch (error) {
            console.error('Error fetching user data:', error);
        } 
    };
    
        fetchUserData();
      });

    return (<>
        <Session />
          <div className="flex justify-center items-center">
           <div className="card w-96 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <img src={'http://localhost:3001/seller/getimage/' + user?.filename} alt="Image not found" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">ID: {user?.sellerId}</h2>
                    Name: {user?.name} <br />
                    email: {user?.email} <br />
                    UserName: {user?.number} <br />
                    UserName: {user?.position} <br />
                    UserName: {user?.username} <br />
                    {/* <input type="text" value={emailInput} onChange={handleEmailChange} /> */}
                    <div className="card-actions">
                        <button className="btn btn-primary"><Link href="/Sales_Representatives/update_profile/">Update Profile</Link></button>
                        <button className="btn btn-primary"><Link href="/Sales_Representatives/add_address/">Add Address</Link></button>
                    </div>
                </div>
            </div>
          </div>
        </>
    );
}