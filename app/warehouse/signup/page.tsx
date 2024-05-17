"use client"
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import NavBar from "../components/navbar/page";


interface FormData {
    name: string;
    email: string;
    username: string;
    password: string;
    address: string;
    myfile: File | null;
}

export default function Signup() {
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        username: '',
        password: '',
        address: '',
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
                formDataObject.append('username', formData.username);
                formDataObject.append('password', formData.password);
                formDataObject.append('address', formData.address);
                if (formData.myfile) {
                    formDataObject.append('myfile', formData.myfile);
                }
                console.log(formDataObject);
                const response = await axios.post('http://localhost:3008/auth/register', formDataObject);

                // toast.success('Signup successful!');
                router.push('/warehouse/signin');

            } catch (error) {
                console.error('Error during signup:', error);
                // toast.error('Signup failed. Please try again.');
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
        }

        if (!formData.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Invalid email address';
        }

        if (!formData.username) {
            errors.username = 'UserName is required';
        }

        if (!formData.address) {
            errors.address = 'Address is required';
        }

        if (!formData.password) {
            errors.password = 'Password is required';
        }

        return errors;
    };
    return (
        <>
            <NavBar />
            <div className="max-w-md mx-auto mt-8">
                <div className="flex items-center justify-center gap-2 mt-3 mb-3">
                    <h1 className="">Sign up</h1>
                </div>
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
                        <input type="text" id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange} className="input input-bordered" placeholder="Username" />
                        {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
                    </div>
                    <div className=" flex items-center justify-center gap-2 mb-2">
                        <input type="text" id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange} className="input input-bordered" placeholder="Address" />
                        {errors.address && <p className="text-red-500 text-xs italic">{errors.address}</p>}
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
                            className="btn btn-active"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}