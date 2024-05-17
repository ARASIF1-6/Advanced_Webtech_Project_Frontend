"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

interface User {
  name: string;
  email: string;
  address: string;
  filename: string
}

export default function Session () {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
      const email = localStorage.getItem('email');
        if (token) {
          const response = await axios.get('http://localhost:8000/admin/getusers/'+email, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUser(response.data);
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

  if (!user) {
    return <div></div>;
  }

  const handleLogout = () => {

    localStorage.removeItem('token');
    localStorage.removeItem('email');
    router.push('/admin/signin');
  };


  return (
    <div className="navbar bg-neutral text-neutral-content">
      <div className="flex-1">
          <Link href="/dashboard/" className="btn btn-ghost text-xl">Dashboard</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
              <li>
                  <div className="dropdown dropdown-end">
                      <div tabIndex={1} role="button" className="">
                          <li>More</li>
                      </div>
                      <ul tabIndex={1} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-neutral text-neutral-content rounded-box w-52">
                          <li>
                              <Link href="" className="justify-between">
                                  Profile
                              </Link>
                          </li>
                          <li><Link href="">Settings</Link></li>
                          <li><button
                              className="bg-gray-300 hover:bg-gray-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                              Logout
                          </button></li>
                      </ul>
                  </div>
              </li>
          </ul>
      </div>
    <div className="flex-none gap-2">
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img alt="Tailwind CSS Navbar component" src={'http://localhost:8000/admin/getimage/'+user.filename} />
          </div>
        </div>
        <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
          <li>
            <a className="justify-between">
              Profile
             
            </a>
          </li>
          <li><a>Settings</a></li>
          <li>
          <button
      className="bg-gray-300 hover:bg-gray-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      onClick={handleLogout}
    >
      Logout
    </button>

          </li>
        </ul>
      </div>
    </div>
  </div>
  );
};



