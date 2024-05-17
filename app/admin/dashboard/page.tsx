'use client'
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import Session from '../components/session';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface User {
  adminId: number;
  name: string;
  email: string;
  address: string;
  filename: string
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

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

  async function handleDelete(){
    if (token) {
      const response = await axios.delete('http://localhost:8000/admin/delete_profile/' + email, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success('Delete Profile');
      router.push('/admin/signin');
    }
  }


  return (<>
    <Session />
    <div className=" justify-center bg-gray-50 py-5 px-4 sm:px-6 lg:px-8">
      <Toaster />

      <div className="card bg-base-100 shadow-xl">
            <figure><img src={'http://localhost:8000/admin/getimage/' + user?.filename} width={400} /></figure>
            <div className="card-body">
                <h2 className="card-title">ID: {user?.adminId}</h2>
                Name:  {user?.name} <br />
                email:  {user?.email}<br />
                address:  {user?.address}<br />
                <div className="card-actions justify-end">
                <button className="btn btn-error" onClick={() => {handleDelete()}}>Delete</button>
                    <button className="btn btn-warning"><Link href="/admin/update/">Update</Link></button>
                </div>
            </div>
            </div>
    </div>
  </>);
}



