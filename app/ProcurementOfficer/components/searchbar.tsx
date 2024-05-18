'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SearchBar: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    router.push(`/suppliers/${searchTerm}`);
  };

  return (
    <div className="mb-4 flex items-center">
      <input
        type="text"
        placeholder="Search suppliers by ID..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md focus:outline-none focus:shadow-outline"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;