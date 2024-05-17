"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from "next/link";
import ProductCard from '../productCard/page';
import StaffCard from '../staffCard/page';

interface User {
    name: string;
    email: string;
    username: string;
    address: string;
    filename: string
}

export default function TopBar() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [jsondata, setJsondata] = useState<any[]>([]);
    const [searchCategory, setSearchCategory] = useState<string>('product');

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
                } else {
                    router.push('/signin');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                router.push('/warehouse/signin');
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
        router.push('/warehouse/signin');
    };

    const handleProfile = () => {
        router.push('/warehouse/profile');
    };

    const handleKeyUp = async (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(event.target.value)
        const searchName = event.target.value;
        if (searchName === '') {
            setJsondata([]);
        } else {
            if (searchCategory === 'product') {
                try {
                    const response = await axios.get('http://localhost:3008/warehouse/search_product_name/', { params: { name: searchName } });
                    setJsondata(response.data);
                    // console.log(jsondata);
                } catch (error) {
                    console.error('Error searching for product:', error);
                }
            } else if (searchCategory == 'staff') {
                try {
                    const response = await axios.get('http://localhost:3008/warehouse/search_staff', { params: { name: searchName } });
                    setJsondata(response.data);
                    // console.log(jsondata);
                } catch (error) {
                    console.error('Error searching for staff:', error);
                }
            }
        }
    };

    const handleCategoryChange = (category: string) => {
        setSearchCategory(category);
    };
    return (
        <>
            <div className="navbar bg-neutral text-neutral-content">
                <div className="flex-1">
                    <Link href="/warehouse/dashboard/" className="btn btn-ghost text-xl">Dashboard</Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link href="/warehouse/product/">Product</Link></li>
                        <li><Link href="/warehouse/staff/">Staff</Link></li>
                        <li>
                            <div className="dropdown dropdown-end">
                                <div tabIndex={1} role="button" className="">
                                    More
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
                    <div className="form-control">
                        <input type="text" onChange={handleKeyUp} placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                    </div>
                    <select value={searchCategory} onChange={(e) => handleCategoryChange(e.target.value)} className="input input-bordered w-24 md:w-auto">
                        <option value="product">Product</option>
                        <option value="staff">Staff</option>
                    </select>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img alt="Tailwind CSS Navbar component" src={'http://localhost:3008/warehouse/getimage/' + user.filename} />
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
                            <li><Link href="">Settings</Link></li>
                            <li><button
                                className=" hover:bg-gray-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                onClick={handleLogout}>
                                Logout
                            </button></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-5 m-3">
                {jsondata ? (
                    jsondata.map((item: any, index: number) => (
                        <div key={index}>
                            {searchCategory === 'product' ? (
                                <ProductCard data={item} />
                            ) : (
                                <StaffCard data={item} />
                            )}
                        </div>
                    ))
                ) : (
                    <div>Loading...</div> // Or any other loading indicator
                )}
            </div>
        </>
    );
}