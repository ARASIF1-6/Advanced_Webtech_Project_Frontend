"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import UpdateProduct from '../update_product/page';
import NavBar from '../components/navbar';
import Session from '../components/session';



interface FormData {
  name: string;
  email: string;
  address: string;
  number: string;
  user: string;
  username: string;
  password: string;
  myfile: File | null;
}

export default function AddCustomer() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    address: '',
    number: '',
    user: 'customer',
    username: '',
    password: '',
    myfile: null,
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const formDataObject = new FormData();
        formDataObject.append('name', formData.name);
        formDataObject.append('email', formData.email);
        formDataObject.append('address', formData.address);
        formDataObject.append('number', formData.number);
        formDataObject.append('user', formData.user);
        formDataObject.append('username', formData.username);
        formDataObject.append('password', formData.password);
        if (formData.myfile) {
          formDataObject.append('profilePic', formData.myfile);
        }
        console.log(formDataObject);
        console.log(formData);
        const response = await axios.post('http://localhost:3001/seller/addcustomer', formDataObject, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, withCredentials: true });
        
        toast.success('Customer add successful!');
        router.push('/Sales_Representatives/dashboard');
     
      } catch (error) {
        console.error('Error during add customer:', error);
        toast.error('Customer add failed. Please try again.');
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'myfile') {
      setFormData({ ...formData, [name]: files ? files[0] : null });
      setErrors({ ...errors, [name]: null });
    } else {
      setFormData({ ...formData, [name]: value });
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = (formData: FormData): Partial<FormData> => {
    const errors: Partial<FormData> = {};

    if (!formData.name) {
      errors.name = 'Name is required';
    } else if (!/^[A-Za-z]+$/.test(formData.name)) {
      errors.name = 'Name field should contain only alphabetic character';
    }

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/.*@.*\.com$/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }

    if (!formData.address) {
        errors.address = 'Address is required';
    }

    if (!formData.number) {
        errors.number = 'Number is required';
    } else if (!/^[0-9]+$/.test(formData.number)) {
      errors.number = 'Phone number field must contain only digits';
    }

    if (!formData.user) {
        errors.user = 'User is required';
    }

    if (!formData.username) {
        errors.username = 'Username is required';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (!/.*[0-9].*/.test(formData.password)) {
      errors.password = 'Password field must contain one of the numeric character';
    } else if (!/[#@\$&]/.test(formData.password)) {
      errors.password = 'Password field must contain one of the special characters (@ or # or $ or &)';
    }


    return errors;
  };

  return (
    <>
    <Session />
    <div className="max-w-md mx-auto mt-8">
        <div className="flex items-center justify-center gap-2 mt-3 mb-3">
            <h1 className="">Add Customer</h1>
        </div>
        <Toaster />
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className=" flex items-center justify-center gap-2 mb-2">
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="input input-bordered" placeholder="name" />
                {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
            </div>
            <div className="flex items-center justify-center gap-2 mb-2">
                <input type="text" id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange} className="input input-bordered" placeholder="Email" />
                {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
            </div>
            <div className=" flex items-center justify-center gap-2 mb-2">
                <input type="text" id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange} className="input input-bordered" placeholder="Address" />
                {errors.address && <p className="text-red-500 text-xs italic">{errors.address}</p>}
            </div>
            <div className=" flex items-center justify-center gap-2 mb-2">
                <input type="number" id="number"
                    name="number"
                    value={formData.number}
                    onChange={handleInputChange} className="input input-bordered" placeholder="Phone Number" />
                {errors.number && <p className="text-red-500 text-xs italic">{errors.number}</p>}
            </div>
            <div className=" flex items-center justify-center gap-2 mb-2">
                <input type="text" id="position"
                    name="position"
                    readOnly
                    value={formData.user}
                    onChange={handleInputChange} className="input input-bordered" placeholder="User" />
                {errors.user && <p className="text-red-500 text-xs italic">{errors.user}</p>}
            </div>
            <div className=" flex items-center justify-center gap-2 mb-2">
                <input type="text" id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange} className="input input-bordered" placeholder="Username" />
                {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
            </div>
            <div className=" flex items-center justify-center gap-2 mb-2">
                <input type="password" id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange} className="input input-bordered" placeholder="password" />
                {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
            </div>
            <div className=" flex items-center justify-center gap-2 mb-2">
                <input type="file" id="myfile"
                    name="myfile"
                    onChange={handleInputChange} className="file-input file-input-bordered file-input-sm w-full max-w-xs" />
            </div>
            <div className="flex justify-center">
                <button
                    type="submit"
                    className="btn btn-active">
                    Registration
                </button>
            </div>
        </form>
    </div>
</>
  );
};