"use client";

import { Toaster, toast } from 'react-hot-toast';
import Sidebar from '../components/sidebar';
import TopBar from '../components/topbar';
import axios from 'axios';
import UserCard from '../components/usercard';
import { useState, useEffect } from 'react';
import router from 'next/router';
import Link from 'next/link';

interface Supplier {
  id: number;
  name: string;
  contactPerson: string;
  email: string;
  phoneNumber: string;
  address: string;
}

const SuppliersPage: React.FC = () => {
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
  
    useEffect(() => {
      fetchData();
    }, []);
  

    const fetchData = async () => {
        try {
          const response = await axios.get<Supplier[]>('http://localhost:3001/suppliers');
          const suppliersData = response.data;
          setSuppliers(suppliersData);
        } catch (error) {
          console.error(error);
          toast.error('Failed to fetch suppliers data');
        }
      };
      
  const handleSearch = async () => {
    router.push(`/suppliers/${searchTerm}`);
  };
 

  return (
    <>
      <TopBar />
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 bg-gray-50 p-5">
          <div className="mb-4 flex items-center">
            <input
              type="text"
              placeholder="Search suppliers by ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md focus:outline-none focus:shadow-outline"
            >
              Search
            </button>
          </div>
          <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 border-b-2 border-gray-300 pb-2">
          All Suppliers
        </h2>
        <Link href="/suppliers/addsupp" className="text-blue-500 hover:underline"> 
          Create New Supplier
        </Link> 
      </div>
          <Toaster />
          <div className="grid grid-cols-3 gap-2">
            {suppliers.map((items: any, index: any) => (
        <div key={index}>
         <UserCard data={items} />
          </div>
          ))}
          
          </div>
        </div>
      </div>
    </>
  );
};

export default SuppliersPage;
