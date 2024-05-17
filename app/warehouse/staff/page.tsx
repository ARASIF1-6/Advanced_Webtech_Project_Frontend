import React, { useEffect, useState } from 'react';

import axios from 'axios';
import TopBar from "../components/topbar/page";
import StaffCard from '../components/staffCard/page';

export default async function Product() {

    const response: any = await axios.get('http://localhost:3008/warehouse/dashboard');
    const jsondata = response.data;
    // console.log(jsondata);

    return (
        <>
            <TopBar />
            <div className="grid grid-cols-2 gap-5 m-3">
                {jsondata.map((items: any, index: any) => {
                    return (<div key={index}>
                        <StaffCard data={items} />
                    </div>
                    );
                })}
            </div>
        </>
    );
}