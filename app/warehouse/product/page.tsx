import React from 'react';
import axios from 'axios';
import TopBar from "../components/topbar/page";
import ProductCard from '../components/productCard/page';

export default async function Product() {

    const response: any = await axios.get('http://localhost:3008/warehouse/show_all_product');
    const jsondata = response.data;

    return (
        <>
            <TopBar />
            <div className="grid grid-cols-3 gap-5 m-3">
                {jsondata.map((items: any, index: any) => {
                    return (<div key={index}>

                        <ProductCard data={items} />
                    </div>

                    );
                }
                )}
            </div>
        </>
    );
}