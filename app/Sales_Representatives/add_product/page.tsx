'use client'
import React, { useState } from 'react';
import axios from "axios";
import Session from '../components/session';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface FormData {
    productCode: string;
    productName: string;
    productQuantity: string;
    productCategory: string;
    productPrice: string;
    myfile: File | null;
  }
  
  export default function Signup() {
    const router = useRouter();
    const [formData, setFormData] = useState<FormData>({
      productCode: '',
      productName: '',
      productQuantity: '',
      productCategory: '',
      productPrice: '',
      myfile: null,
    });
    const [errors, setErrors] = useState<Partial<FormData>>({});
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const validationErrors = validateForm(formData);
  
      if (Object.keys(validationErrors).length === 0) {
        try {
          const formDataObject = new FormData();
          formDataObject.append('productCode', formData.productCode);
          formDataObject.append('productName', formData.productName);
          formDataObject.append('productQuantity', formData.productQuantity);
          formDataObject.append('productCategory', formData.productCategory);
          formDataObject.append('productPrice', formData.productPrice);
          if (formData.myfile) {
            formDataObject.append('productPic', formData.myfile);
          }
          console.log(formDataObject);
          console.log(formData);
          const response = await axios.post('http://localhost:3001/seller/addproduct', formDataObject);
          
          toast.success('Product Add successful!');
          router.push('/Sales_Representatives/dashboard');
       
        } catch (error) {
          console.error('Error during product registration:', error);
          toast.error('Product Registration failed. Please try again.');
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
  
      if (!formData.productCode) {
        errors.productCode = 'Product Code is required';
      } else if (!/^[0-9]+$/.test(formData.productCode)) {
        errors.productCode = 'Product Code field must contain only digits';
      }
  
      if (!formData.productName) {
        errors.productName = 'Product Name is required';
      } else if (!/^[A-Za-z]+$/.test(formData.productName)) {
        errors.productName = 'Product Name field should contain only alphabetic character';
      }
  
      if (!formData.productQuantity) {
          errors.productQuantity = 'Product Quantity is required';
      } else if (!/^[0-9]+$/.test(formData.productQuantity)) {
        errors.productQuantity = 'Product Quantity field must contain only digits';
      }

      if (!formData.productCategory) {
        errors.productCategory = 'Product Category is required';
      } else if (!/^[A-Za-z]+$/.test(formData.productCategory)) {
        errors.productCategory = 'Product Category field should contain only alphabetic character';
      }

      if (!formData.productPrice) {
        errors.productPrice = 'Product Price is required';
    } else if (!/^[0-9]+$/.test(formData.productPrice)) {
      errors.productPrice = 'Product Price field must contain only digits';
    }
  
  
      return errors;
    };
  
    return (
      <>
      <Session />
      <div className="max-w-md mx-auto mt-8">
          <div className="flex items-center justify-center gap-2 mt-3 mb-3">
              <h1 className="">Add Product</h1>
          </div>
          <Toaster />
          <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
              <div className=" flex items-center justify-center gap-2 mb-2">
                  <input type="text" id="productName" name="productName" value={formData.productName} onChange={handleInputChange} className="input input-bordered" placeholder="Product Name" />
                  {errors.productName && <p className="text-red-500 text-xs italic">{errors.productName}</p>}
              </div>
              <div className="flex items-center justify-center gap-2 mb-2">
                  <input type="number" id="productCode"
                      name="productCode"
                      value={formData.productCode}
                      onChange={handleInputChange} className="input input-bordered" placeholder="Product Code" />
                  {errors.productCode && <p className="text-red-500 text-xs italic">{errors.productCode}</p>}
              </div>
              <div className=" flex items-center justify-center gap-2 mb-2">
                  <input type="number" id="productQuantity"
                      name="productQuantity"
                      value={formData.productQuantity}
                      onChange={handleInputChange} className="input input-bordered" placeholder="Product Quantity" />
                  {errors.productQuantity && <p className="text-red-500 text-xs italic">{errors.productQuantity}</p>}
              </div>
              <div className=" flex items-center justify-center gap-2 mb-2">
                  <input type="text" id="productCategory"
                      name="productCategory"
                      value={formData.productCategory}
                      onChange={handleInputChange} className="input input-bordered" placeholder="Product Category" />
                  {errors.productCategory && <p className="text-red-500 text-xs italic">{errors.productCategory}</p>}
              </div>
              <div className=" flex items-center justify-center gap-2 mb-2">
                  <input type="text" id="productPrice"
                      name="productPrice"
                      value={formData.productPrice}
                      onChange={handleInputChange} className="input input-bordered" placeholder="Price" />
                  {errors.productPrice && <p className="text-red-500 text-xs italic">{errors.productPrice}</p>}
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
                      Product Registration
                  </button>
              </div>
          </form>
      </div>
  </>
    );
  };
