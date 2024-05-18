import { notFound } from 'next/navigation';
import axios from 'axios';
import UserCard from '../../../components/usercard';

export default async function SupplierDetailsPage({ params }: { params: { id: string } }) {
  try {
    const response = await axios.get(`http://localhost:3001/suppliers/${params.id}`);
    const supplierData = response.data;

    if (!supplierData) {
      notFound();
    }

    return (
      <div className="container mx-auto p-8 bg-white rounded-lg shadow-md">
        <UserCard data={supplierData} /> 
      </div>
    );
  } catch (error) {
    console.error("Error fetching supplier details:", error);
    return <div>Error loading supplier details.</div>;
  }
}
