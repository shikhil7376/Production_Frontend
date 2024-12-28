import React from 'react'
import Table2 from '../../components/Admin/Table2';
import { useState, useEffect,useRef } from 'react';
import { toast } from 'react-toastify';
import ReactLoading from 'react-loading';
import { getRequests } from '../../Api/Admin';
import { TiArrowBack,TiArrowForward  } from "react-icons/ti";
import { useCallback } from 'react';
import PacmanLoader from "react-spinners/PacmanLoader";
import { debounce } from '../../lib/utils';


const KennelApproval = () => {

    const [kennelOwners, setKennelOwners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const limit = 5;

    const searchTermRef = useRef(searchTerm);


    const fetchKennelOwners = async () => { 
        setLoading(true);
        try {
          const response = await getRequests(page, limit, searchTerm);
          setKennelOwners(response?.data.data);
          setTotal(response?.data.total); // Set the total count
        } catch (error) {
          console.error('failed to fetch users:', error);
          toast.error('failed to fetch users');
        }
        setLoading(false);
      };

      const debouncedFetchUsers = useCallback(
        debounce(fetchKennelOwners, 1000), // Debounce delay of 1000ms
        []
      );

      
      useEffect(() => {
    
        debouncedFetchUsers(); // Call the debounced function
    
        // Cleanup function
        return () => {
          // No explicit cleanup needed for debounced function
        };
      }, [searchTerm, page, debouncedFetchUsers]);
      
        useEffect(() => {
          searchTermRef.current = searchTerm;
        }, [searchTerm]);
  
        const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
          setSearchTerm(e.target.value);
          setPage(1); // Reset to first page on search
        };
    
      const handlePreviousPage = () => {
        if (page > 1) {
          setPage(page - 1);
        }
      };
    
      const handleNextPage = () => {
        if (page * limit < total) {
          setPage(page + 1);
        }
      };

  return (
    <div>
    <div className='mt-1 ml-16 w-[250px] flex'>
      <input
        placeholder="Search"
        onChange={handleSearch}
        value={searchTerm}
        className="w-[250px] h-10 border-1 text-small rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-gray-500"
      />
    </div>
    {loading ? (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <PacmanLoader size={40} color="#ffffff" />
        </div>
    ) : kennelOwners.length > 0 ? (
      <Table2 kennelOwners={kennelOwners} fetchKennelOwners={fetchKennelOwners} />
    ) : (
      <p className='ml-[400px] text-red-700 font-sm font-semibold'>No Users found</p>
    )}
    <div className='flex justify-center mt-4'>
      <button 
        onClick={handlePreviousPage} 
        disabled={page === 1} 
        className={`w-10 h-10 flex items-center justify-center rounded-full border p-2 ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
       <TiArrowBack />
      </button>
      <button 
        onClick={handleNextPage} 
        disabled={page * limit >= total} 
        className={`w-10 h-10 flex items-center justify-center rounded-full border p-2 ${page * limit >= total ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
                      <TiArrowForward />
      </button>
    </div>
  </div>
  )
}

export default KennelApproval
