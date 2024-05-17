'use client'
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Session from '../components/session';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

interface Product {
    productId: number;
    productName: string;
    productQuantity: number;
    productPrice: number
  }


export default function Cart() {

    const [jsonData, setJsonData] = useState([]);
    const [total_price, setTotalPrice] = useState('');
    const [quantityInput, setQuantityInput] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
        try {
            const token = localStorage.getItem('token');
            const username = localStorage.getItem('username');
            if (token) {
              const response = await axios.get('http://localhost:3001/seller/view_cart', { headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, withCredentials: true });
              const jsonData = response.data
              setJsonData(jsonData.cart_data);
              setTotalPrice(jsonData.total_price);
              //setQuantityInput(jsonData.productQuantity);

            } else {
                
            }
        } 
        catch (error) {
            console.error('Error fetching user data:', error);
        } 
    };
    
        fetchUserData();
    });

    async function handleOrder(items: number, msg: string){
        try {
    
          const token = localStorage.getItem('token');
          const username = localStorage.getItem('username');
          if (token) {
            const response = await axios.post(`http://localhost:3001/seller/confirm_order/?msg=${msg}&username=${username}&productId=${items}` );
    
            toast.success('Add to Cart');
    
          } else {
              
          }
        } catch(error){
          console.error('Error Add Cart:', error);
        }

        console.log(items);
    }


    //   const handleQuantityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    //     setQuantityInput(e.target.value);
    // }
 
    return (<>
       <Session />

      <div className="grid grid-cols-6 gap-2">
        {jsonData.map((items: any, index: any) => {
           return (<div key={index}>
            {/* <ProductCard data={items} /> */}
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              {/* <a href="#">
                <img className="p-8 rounded-t-lg" src={'http://localhost:3001/seller/getimage/' + items.filename} alt="product image" />
              </a> */}
              <div className="px-5 pb-5">
                <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                  {items.productName}
                </h5>
              Id:  {items.productId}<br />
              Quantity: {items.productQuantity}<br />
              {/* <input type="text" value={items.productQuantity} onChange={handleQuantityInputChange} /> */}
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">৳{items.productPrice}</span>
                <button className="text-white bg-neutral hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
              </div> <br />
              <div className="flex items-center justify-between">
            {/* <Link href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</Link>
            <a href="#" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Delete</a> */}
               <button className="text-white bg-neutral hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => handleOrder(items.productId, "no")}>Remove</button>
              </div>
              </div>
            </div>
      </div>

          );
        }


        )}
      </div>
      <h6> {total_price} </h6>
      <button className="text-white bg-neutral hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => handleOrder(0, "yes")}>CheckOut</button>
        </>
    );
}