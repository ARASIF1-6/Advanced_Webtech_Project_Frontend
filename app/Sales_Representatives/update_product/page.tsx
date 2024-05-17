'use client'
import React, { useState } from 'react';
import axios from "axios";




export default function UpdateProduct(items: any) {

    const [productId, setId] = useState('');
    const [productName, setName] = useState('');
    const [productCode, setCode] = useState('');
    const [productQuantity, setQuantity] = useState('');
    const [productCategory, setCategory] = useState('');
    const [productPrice, setPrice] = useState('');
    const [productPic, setPic] = useState('');
 
    const handleChange = (e: any) => {
        setPic(e.target.files[0]);
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
          const productData = new FormData();
          productData.append('productName', productName);
          productData.append('productCode', productCode);
          productData.append('productQuantity', productQuantity);
          productData.append('productCategory', productCategory);
          productData.append('productPrice', productPrice);
          productData.append('productPic', productPic);

          const response = await axios.post("http://localhost:3001/seller/addproduct", productData);
          //const response = await axios.post(process.env.NEXT_PUBLIC_API_ENDPOINT + '/seller/addproduct', productData);
          console.log(response);
          } catch (error) {
          console.error(error);
          }
        console.log({ productName, productCode, productQuantity, productCategory, productPrice, productPic });
    };
 
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="productId">Product Id:</label>
            <input
                type="productId"
                id="productId"
                value={productId}
                onChange={(e) => setId(e.target.value)}
            /> <br/>
            <label htmlFor="productName">Product Name:</label>
            <input
                type="productName"
                id="productName"
                value={productName}
                onChange={(e) => setName(e.target.value)}
            /> <br/>
            <label htmlFor="productCode">Product Code:</label>
            <input
                type="productCode"
                id="productCode"
                value={productCode}
                onChange={(e) => setCode(e.target.value)}
            /> <br/>
            <label htmlFor="productQuantity">Product Quantity:</label>
            <input
                type="productQuantity"
                id="productQuantity"
                value={productQuantity}
                onChange={(e) => setQuantity(e.target.value)}
            /> <br/>
            <label htmlFor="productCategory">Product Category:</label>
            <input
                type="productCategory"
                id="productCategory"
                value={productCategory}
                onChange={(e) => setCategory(e.target.value)}
            /> <br/>
            <label htmlFor="productPrice">Product Price:</label>
            <input
                type="productPrice"
                id="productPrice"
                value={productPrice}
                onChange={(e) => setPrice(e.target.value)}
            /> <br/>
            <input
                type="file"
                id="productPic"
                //value={filename}
                //onChange={(e) => setPic(e.target.value)}
                onChange={handleChange}
            /> <br/>
 
            <button type="submit">Submit</button>
        </form>
    );
}