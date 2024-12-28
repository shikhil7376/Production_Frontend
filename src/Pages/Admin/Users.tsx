import React, { useState, useEffect, useCallback } from 'react';
import Table1 from '../../components/Admin/Table1';
import { toast } from 'react-toastify';
import { getUsers } from '../../Api/Admin';
import { TiArrowBack, TiArrowForward } from "react-icons/ti";
import PacmanLoader from "react-spinners/PacmanLoader";

interface Userdata {
    _id: string,
    name: string,
    email: string,
    phone: string,
    isBlocked: boolean,
    isAdmin: boolean,
}

const Users = () => {
    const [users, setUsers] = useState<Userdata[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
    const [page, setPage] = useState<number>(1);
    const limit: number = 5;
    const [total, setTotal] = useState<number>(0);

    // Debounce the search term change
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 1000); // Debounce delay of 1000ms

        // Cleanup timeout on each re-render
        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getUsers(page, limit, debouncedSearchTerm); // Use the debounced search term
            setUsers(response?.data.data);
            setTotal(response?.data.total);
        } catch (error) {
            console.error('Failed to fetch users:', error);
            toast.error('Failed to fetch users');
        }
        setLoading(false);
    }, [page, debouncedSearchTerm]);

    useEffect(() => {
        fetchUsers(); // Call fetchUsers whenever page or debounced search term changes
    }, [fetchUsers]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setPage(1); // Reset to the first page on search
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
            ) : users.length > 0 ? (
                <Table1 users={users} fetchUsers={fetchUsers} />
            ) : (
                <p className='ml-[400px] text-red-700 font-semibold text-small'>No Users found</p>
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
    );
};

export default Users;
