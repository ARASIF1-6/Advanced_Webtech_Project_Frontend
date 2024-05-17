"use client"

import React, { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';

interface User {
  name: string;
  username: string;
  filename: string
}

export default function Session () {
  const router = useRouter();
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
        } else {
          router.push('/Sales_Representatives/sign_in');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push('/Sales_Representatives/sign_in');
      } 
    };

    fetchUserData();
  }, [router]);

  if (!user) {
    return <div></div>;
  }

  const handleProfile = () => {
    router.push('/Sales_Representatives/show_profile');
};

  const handleLogout = () => {

    localStorage.removeItem('token');
    localStorage.removeItem('username');
    router.push('/Sales_Representatives/sign_in');
  };


  return (
  <>
  <div className="navbar bg-neutral text-neutral-content">
      <div className="flex-1">
          <Link href="/Sales_Representatives/dashboard/" className="btn btn-ghost text-xl">Dashboard</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
              <li><Link href="/Sales_Representatives/add_product/">Add Product</Link></li>
              <li><Link href="/Sales_Representatives/add_customer/">Add Customer</Link></li>
              <li><Link href="/Sales_Representatives/cart/">Cart</Link></li>
              <li><Link href="/Sales_Representatives/show_order/">Order History</Link></li>
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
                              className="bg-gray-300 hover:bg-gray-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          >
                              Logout
                          </button></li>
                      </ul>
                  </div>
              </li>
          </ul>
      </div>
      <div className="flex-none gap-2">
          {/* <div className="form-control">
              <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
          </div> */}
          <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full">
                      <img alt="Tailwind CSS Navbar component" src={'http://localhost:3001/seller/getimage/' + user.filename} />
                  </div>
              </div>
              <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-neutral text-neutral-content rounded-box w-52">
                  <li>
                      <button
                          className=" hover:bg-gray-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                          onClick={handleProfile}>
                          Profile
                      </button>
                  </li>
                  <li><Link href="/Sales_Representatives/update_password">Settings</Link></li>
                  <li><button
                      className=" hover:bg-gray-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      onClick={handleLogout}>
                      Logout
                  </button></li>
              </ul>
          </div>
      </div>
  </div>
</>
  );
};