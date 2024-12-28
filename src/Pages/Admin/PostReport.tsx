import React from 'react'
import errorHandle from '../../Api/Error'
import { useEffect,useState,useCallback } from 'react'
import { ReportedPost } from '../../Interface/DatatypeInterface'
import PacmanLoader from "react-spinners/PacmanLoader";
import { Table } from 'flowbite-react';
import { getReports } from '../../Api/Admin'
import { blockPost } from '../../Api/Admin';
import { unblockPost } from '../../Api/Admin';
import { TiArrowBack, TiArrowForward } from "react-icons/ti";


const PostReport = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [reports, setReports] = useState<ReportedPost[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const limit: number = 5;
    const [total, setTotal] = useState<number>(0);

    useEffect(() => {
      const handler = setTimeout(() => {
          setDebouncedSearchTerm(searchTerm);
      }, 1000); // Debounce delay of 1000ms

      // Cleanup timeout on each re-render
      return () => {
          clearTimeout(handler);
      };
  }, [searchTerm]);

    const handleBlock = async (postId: string) => {
      try {
         const response = await blockPost(postId)       
         if(response){
          fetchReports()
         }
      } catch (error) {
          errorHandle(error);
      }
  };

  const handleUnBlock = async(postId:string)=>{
     try {
        const response = await unblockPost(postId)
        if(response){
          fetchReports()
        }   
     } catch (error) {
      errorHandle(error);
     }
  }
   
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
      setPage(1); // Reset to the first page on search
  };

  const fetchReports = useCallback(async()=>{
       setLoading(true)
       try {
        const response = await getReports(page, limit, debouncedSearchTerm) 
        if(response){
          setReports(response.data.data)
          setTotal(response?.data.total);
       }
       } catch (error) {
        console.error('Failed to fetch users:', error);
       }
       setLoading(false);
  },[page, debouncedSearchTerm])
   

    useEffect(()=>{
      fetchReports()
     },[fetchReports])

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
            ) : reports.length > 0 ? (
                <div className="overflow-x-auto ml-[54px]"> 
      
                <div className='mt-2 ml-5 mr-5 '>
                <Table >
                  <Table.Head>
                    <Table.HeadCell className='font-roboto'> Image </Table.HeadCell>
                    <Table.HeadCell className='font-roboto'> Post Owner </Table.HeadCell>
                    <Table.HeadCell className='font-roboto'> Reporter </Table.HeadCell>
                    <Table.HeadCell className='font-roboto'> Reason </Table.HeadCell>
                    <Table.HeadCell className='font-roboto'> Status </Table.HeadCell>
                    <Table.HeadCell className='font-roboto'> Action </Table.HeadCell>
                  </Table.Head>
                  <Table.Body className="divide-y">
                    {reports.map((report, index) => (
                      <Table.Row key={index} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                       <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                            <div className="flex space-x-2"> 
                                                {report.postDetails.image.map((imgUrl, index) => (
                                                    <img 
                                                        key={index} 
                                                        src={imgUrl} 
                                                        alt={`Reported Post ${index}`} 
                                                        className="h-16 w-16 object-cover rounded"
                                                    />
                                                ))}
                                            </div>
                                        </Table.Cell>
                        <Table.Cell className='font-roboto'>{report.postUserDetails.name}</Table.Cell>
                        <Table.Cell className='font-roboto'>{report.reporterDetails.name}</Table.Cell>
                        <Table.Cell className='font-roboto'>{report.reason}</Table.Cell>
                        <Table.Cell className='font-roboto'>{report.status}</Table.Cell>

                        <Table.Cell>
                          
                        {report.postDetails.is_block ? (
                                                <button
                                                    className='bg-green-600 p-2 font-roboto text-white rounded-lg'
                                                    onClick={()=>handleUnBlock(report.postId)}
                                                >
                                                    Unblock
                                                </button>
                                            ) : (
                                                <button
                                                    className='bg-red-600 p-2 font-roboto text-white rounded-lg'
                                                    onClick={() => handleBlock(report.postId)}
                                                >
                                                    Block
                                                </button>
                                            )}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
                
                </div>
              </div>
            ) : (
                <p className='ml-[400px] text-red-700 font-semibold text-small'>No Reports Found</p>
            )}

<div className='flex justify-center'>
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

export default PostReport
