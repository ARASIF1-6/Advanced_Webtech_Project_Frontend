import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import UserCard from '../components/usercard';
import TopBar from '../components/topbar';
import Sidebar from '../components/sidebar';

export default async function Dashboard() {
  const response: any = await axios.get('http://localhost:3001/suppliers');
  const jsondata = response.data;

  const response1: any = await axios.get('http://localhost:3001/purchase-orders');
  const jsondata1 = response1.data;

  const response2: any = await axios.get('http://localhost:3001/inventory');
  const jsondata2 = response2.data;
  return (<>
  <TopBar />
  <div className="flex min-h-screen">
    <Sidebar/>
    <div className="flex-1 bg-gray-50 p-5"> 
      
      <Toaster />
      <span className="ml-2 text-xl font-semibold text-gray-800">Suppliers Overview</span>
      <div className="grid grid-cols-3 gap-2">
      {jsondata.slice(0, 3).map((items: any, index: any) => (
      <div key={index}>
       <UserCard data={items} />
       </div>
        ))}
      </div>

      <span className="ml-2 text-xl font-semibold text-gray-800">Purchase Orders Overview</span>
      <div className="grid grid-cols-3 gap-2">
      {jsondata1.slice(0, 3).map((items: any, index: any) => (
     <div key={index}>
    <UserCard data={items} />
     </div>
          ))}
      </div>

      <span className="ml-2 text-xl font-semibold text-gray-800">Inventory Overview</span>
      <div className="grid grid-cols-3 gap-2">
      {jsondata2.slice(0, 3).map((items: any, index: any) => (
        <div key={index}>
         <UserCard data={items} />
          </div>
          ))}
      </div>
    </div>
  </div>
  </>);
}