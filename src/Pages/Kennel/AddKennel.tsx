import React, { useState, useEffect, useCallback } from 'react';
import { Image } from '@nextui-org/react';
import AddModal from '../../components/Kennel/AddModal';
import CageDataModal from '../../components/Kennel/CageDataModal';
import { ownersCages } from '../../Api/Kennel';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';
import { ownersCageData } from '../../Interface/DatatypeInterface';
import { TiArrowBack, TiArrowForward } from "react-icons/ti";
import errorHandle from '../../Api/Error';
import TableSkelton from '../../components/Common/TableSkelton';

const Addkennel = () => {
  const kennelOwnerData = useSelector((state: RootState) => state.kennel.kennelOwnerData);
  const [cages, setCages] = useState<ownersCageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const limit: number = 4;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000); // 1 second debounce delay

    // Cleanup the timeout on re-render
    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  const fetchCages = useCallback(async () => {
    try {
      setLoading(true);
      const response = await ownersCages(kennelOwnerData?._id, page, limit, debouncedSearchTerm);
      setCages(response?.data.data);
      setTotal(response?.data.total);
    } catch (error) {
      errorHandle(error);
    } finally {
      setLoading(false);
    }
  }, [page, debouncedSearchTerm, kennelOwnerData?._id]);

  useEffect(() => {
    fetchCages(); // Fetch cages when page or debounced search term changes
  }, [fetchCages]);

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
    <div className='p-5'>
      <div className='display flex gap-2'>
        <div className='pb-3'>
          <AddModal fetchCages={fetchCages} />
        </div>
        <div>
          <input
            placeholder="Search"
            onChange={handleSearch}
            value={searchTerm}
            className="w-[250px] font-roboto text-sm h-10 border-1 rounded-full p-3 focus:outline-none focus:ring-1 focus:ring-gray-500"
          />
        </div>
      </div>
      {loading ? (
        <div className='flex justify-center items-center h-[300px]'>
          <TableSkelton />
        </div>
      ) : cages.length > 0 ? (
        <div className='grid grid-cols-4 gap-4'>
          {cages.map((cage, index) => (
            <div key={index} className='card h-[270px] w-[200px] bg-white flex flex-col justify-between items-center rounded-2xl border-1 drop-shadow-xl'>
              <div className='w-[160px] h-[160px] overflow-hidden mt-2'>
                <Image
                  width={160}
                  height={160}
                  src={cage.image[0] || "pics/fffff-min.jpg"}
                  alt="Cage"
                  className='object-cover mt-2'
                />
              </div>
              <p className='font-roboto mt-2 text-small'>{cage.kennelname || 'ADOPTION'}</p>
              <p className='text-sm font-semibold text-gray-500'></p>
              <div className='display flex justify-center items-center'>
                <div className="mt-auto mb-4 p-2">
                  <CageDataModal cageid={cage._id} fetchCages={fetchCages} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className='ml-[400px] text-red-700 font-semibold text-small'>No Cages found</p>
      )}
      <div className='flex justify-center pt-10'>
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
  );
};

export default Addkennel;
