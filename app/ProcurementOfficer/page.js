
"use client";

import React from 'react';
import TopBar from './components/topbar';

export default function Home() {
  return (<>
  
  <TopBar /> 
    <section className="bg-white dark:bg-gray-900">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
          <img
            alt="Inventory Management"
            width={870}
            height={870}
            src="https://img.freepik.com/free-vector/conveyor-belt-warehouse-concept-illustration_114360-15026.jpg?w=826&t=st=1715696621~exp=1715697221~hmac=2ae2d338351e1ee798996ef3ce78fd68756133695d7d9c5ac4620ce91e2157ca"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </aside>
        {/* Login Section */}
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="max-w-xl lg:max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              Inventory Management
            </h1>
            <p className="mt-4 leading-relaxed text-gray-500 dark:text-gray-400">
              Streamline your inventory tracking, management, and optimization.
            </p>
            <div className="mt-8">
              <a href="/signin"
                className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-md font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500 dark:hover:bg-blue-700 dark:hover:text-white">
                Get Started
              </a>
            </div>
          </div>
        </main>
      </div>
    </section></>
  );
}
