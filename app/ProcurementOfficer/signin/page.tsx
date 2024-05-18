"use client";
import { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Toaster, toast } from 'react-hot-toast';

interface FormData {
  email: string;
  password: string;
}

export default function Signin() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert('Please fill out all fields');
      return;
    }
    router.push('/dashboard');
    try {
      const response = await axios.post('http://localhost:3000/auth/login', formData);
      console.log(response.data);

      const  token  = response.data;
      console.log(token.access_token);
      localStorage.setItem('token', token.access_token);
      localStorage.setItem('email', formData.email);

      toast.success('Sign in successful');
      router.push('/dashboard');
    } catch (error) {
      router.push('/dashboard');
      console.error('Error signing in:', error);
      toast.error('Sign in failed. Please check your credentials.');
    }
  };

  return (
    <>
    <section className="bg-white dark:bg-gray-900">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="inv image"
            width={870}
            height={870}
            src="https://img.freepik.com/free-vector/conveyor-belt-warehouse-concept-illustration_114360-15026.jpg?w=826&t=st=1715696621~exp=1715697221~hmac=2ae2d338351e1ee798996ef3ce78fd68756133695d7d9c5ac4620ce91e2157ca"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>

        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl">
        

            <h1 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl md:text-4xl">
              Welcome to Inventory Management
            </h1>

            <p className="mt-4 leading-relaxed text-gray-500 dark:text-gray-400">
              Login to Continue.
            </p>

            <div
              className="mt-8 grid grid-cols-6 gap-6"
            >
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="username"
                  className="block text-md font-medium text-gray-700 dark:text-gray-200"
                >
                  Username
                </label>

                <input id="email" name="email" type="text" autoComplete="email"  
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                 placeholder="Email address" value={formData.email} onChange={handleChange} />

              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="password"
                  className="block text-md font-medium text-gray-700 dark:text-gray-200"
                >
                  Password
                </label>

                <input id="password" name="password" type="password" autoComplete="current-password"  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" 
                placeholder="Password" value={formData.password} onChange={handleChange} />
              
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button onClick={handleSubmit} className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-md font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white">
                  Log In
                </button>

                <p className="mt-4 text-md text-gray-500 dark:text-gray-400 sm:mt-0">
                  <span>Dont have an account? </span>
                  <a
                    href="/signup"
                    className="text-gray-700 underline dark:text-gray-200"
                  >
                    Sign Up
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  </>
  );
}