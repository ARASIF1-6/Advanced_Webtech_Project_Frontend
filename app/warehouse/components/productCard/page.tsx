"use client"
import axios from "axios";
import { useRouter } from 'next/navigation';
import { useState } from "react";


interface FormData {
    productCode: string;
    productName: string;
    productQuantity: string;
    productPrice: string;
}
interface selectedProduct {
    productCode: string;
    productName: string;
    productQuantity: string;
    productPrice: string;
}

export default function ProductCard(props: any) {
    const router = useRouter();
    const [errors, setErrors] = useState<Partial<FormData>>({});
    const [formData, setFormData] = useState<FormData>({
        productCode: '',
        productName: '',
        productQuantity: '',
        productPrice: '',
    });
    const [selectedProduct, setSelectedProduct] = useState<selectedProduct>({
        productCode: '',
        productName: '',
        productQuantity: '',
        productPrice: '',
    });

    console.log(selectedProduct.productCode);
    const handleUpdateClick = (product: any) => {
        setSelectedProduct(product);
        setFormData({
            productCode: product.productCode,
            productName: product.productName,
            productQuantity: product.productQuantity,
            productPrice: product.productPrice,
        });
    };
    // console.log(formData);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validateForm(formData);

        if (Object.keys(validationErrors).length === 0) {
            try {
                const formDataObject = new FormData();
                formDataObject.append('name', formData.productCode);
                formDataObject.append('name', formData.productName);
                formDataObject.append('name', formData.productQuantity);
                formDataObject.append('price', formData.productPrice);

                console.log(formDataObject);
                const token = localStorage.getItem('token');
                const response = await axios.post('http://localhost:3008/update_product/' + props.data.productId, {
                    productCode: formData.productCode,
                    productName: formData.productName,
                    productQuantity: formData.productQuantity,
                    productPrice: formData.productPrice,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // toast.success('Signup successful!');
                router.push('/warehouse/product');

            } catch (error) {
                console.error('Error during updating:', error);
                // toast.error('Signup failed. Please try again.');
            }
        } else {
            setErrors(validationErrors);
        }
    };
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;

        setSelectedProduct({ ...selectedProduct, [name]: value });
        // setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' });
    };
    const validateForm = (formData: FormData): Partial<FormData> => {
        const errors: Partial<FormData> = {};

        if (!formData.productCode) {
            errors.productCode = 'productCode is required';
        }
        if (!isNaN(+formData.productCode)) {
            errors.productCode = 'productCode should be a number';
        }
        if (!formData.productName) {
            errors.productName = 'productName is required';
        }
        if (!formData.productQuantity) {
            errors.productQuantity = 'quantity is required';
        }
        if (!isNaN(+formData.productQuantity)) {
            errors.productQuantity = 'Quantity should be a number';
        }
        if (!formData.productPrice) {
            errors.productPrice = 'price is required';
        }
        if (!isNaN(+formData.productPrice)) {
            errors.productPrice = 'price should be a number';
        }
        return errors;
    };
    return (
        <>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <img src={'http://localhost:3008/warehouse/getimage/' + props.data.filename} alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title"> {props.data.productName}</h2>
                    ID: {props.data.productId} <br />
                    Product Code: {props.data.productCode} <br />
                    Quantity: {props.data.productQuantity} <br />
                    Catagory: {props.data.productCategory} <br />
                    Price: {props.data.productPrice} <br />
                    <div className="card-actions">
                        <label htmlFor="my_modal_6" className="btn  btn-primary" onClick={() => handleUpdateClick(props.data)}>Update</label>

                        {/* modal start  */}
                        <input type="checkbox" id="my_modal_6" className="modal-toggle" />
                        <div className="modal" role="dialog">
                            <div className="modal-box">
                                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <input type="text" id="email"
                                            name="productCode"
                                            value={formData.productCode}
                                            onChange={handleInputChange} className="input input-bordered" placeholder="Product Code" />
                                        {/* {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>} */}
                                    </div>
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <input type="text" id="email"
                                            name="productName"
                                            value={formData.productName}
                                            onChange={handleInputChange} className="input input-bordered" placeholder="Product Name" />
                                        {/* {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>} */}
                                    </div>
                                    <div className="flex items-center justify-center gap-2 mb-2">
                                        <input type="text" id="email"
                                            name="productQuantity"
                                            value={formData.productQuantity}
                                            onChange={handleInputChange} className="input input-bordered" placeholder="Quantity" />
                                        {/* {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>} */}
                                    </div>
                                    <div className=" flex items-center justify-center gap-2 mb-2">
                                        <input type="text" id="username"
                                            name="productPrice"
                                            value={formData.productPrice}
                                            onChange={handleInputChange} className="input input-bordered" placeholder="Price" />
                                        {/* {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>} */}
                                    </div>
                                    <div className="modal-action">
                                        <button
                                            type="submit"
                                            className="btn btn-active"
                                        >
                                            Update!
                                        </button>
                                        <label htmlFor="my_modal_6" className="btn">Close!</label>
                                    </div>
                                </form>
                            </div>
                        </div >

                        <button className="btn btn-primary">Delete</button>
                    </div>
                </div>
            </div >


        </>
    );
}