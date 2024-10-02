import React, { useEffect, useState } from 'react';
import { getDashboard } from '../../Api/Kennel';
import { useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';
import { dashboard } from '../../Interface/DatatypeInterface';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const kennelOwnerData = useSelector((state: RootState) => state.kennel.kennelOwnerData);
  const [data, setData] = useState<dashboard>();

  const fetchData = async () => {
    const response = await getDashboard(kennelOwnerData?._id as string);
    if (response) {
      setData(response.data);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // Chart Data
  const chartData = [
    { name: 'Daily Profit', value: data?.dailyProfit || 0 },
    { name: 'Monthly Profit', value: data?.monthlyProfit || 0 },
    { name: 'Daily Bookings', value: data?.dailyBookings || 0 },
    { name: 'Monthly Bookings', value: data?.monthlyBookings || 0 },
  ];

  return (
    <div className='display flex flex-col p-2 pt-3 gap-6'>
      <div className='flex gap-2 justify-evenly'>
        <div className='card h-[150px] w-[180px] bg-white flex flex-col rounded-md border-1 drop-shadow-xl'>
          <p className='p-5 text-default-400 font-roboto'>Daily Profit</p>
          <h2 className='pl-5 font-semibold text-3xl font-roboto'>${data?.dailyProfit}</h2>
        </div>
        <div className='card h-[150px] w-[180px] bg-white flex flex-col rounded-md border-1 drop-shadow-xl font-roboto'>
          <p className='p-5 text-default-400'>Monthly Profit</p>
          <h2 className='pl-5 font-semibold text-3xl'>${data?.monthlyProfit}</h2>
        </div>
        <div className='card h-[150px] w-[180px] bg-white flex flex-col rounded-md border-1 drop-shadow-xl font-roboto'>
          <p className='p-5 text-default-400'>Daily Bookings</p>
          <h2 className='pl-5 font-semibold text-3xl'>{data?.dailyBookings}</h2>
        </div>
        <div className='card h-[150px] w-[180px] bg-white flex flex-col rounded-md border-1 drop-shadow-xl font-roboto'>
          <p className='p-5 text-default-400'>Monthly Bookings</p>
          <h2 className='pl-5 font-semibold text-3xl'>{data?.monthlyBookings}</h2>
        </div>
      </div>

      {/* Chart Section */}
      <div className='chart-container bg-white rounded-md p-4 drop-shadow-xl font-roboto text-sm'>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Dashboard;
