import React from 'react';
import { Card, Skeleton } from "@nextui-org/react";
import '../../components/Common/TableSkelton.css'

const TableSkelton = () => {
  return (
    <div className='grid grid-cols-4 gap-4'>
      {Array(4).fill(0).map((_, index) => (
        <Card key={index} className="h-[270px] w-[200px] space-y-4 p-4 flex flex-col items-center rounded-2xl border-1 drop-shadow-xl">
          <Skeleton className="rounded-2xl">
            <div className="w-[160px] h-[160px] bg-default-300"></div>
          </Skeleton>
          <Skeleton className="w-[80%] rounded-lg">
            <div className="h-3 rounded bg-default-200 animate-slow-pulse"></div>
          </Skeleton>
          <Skeleton className="w-[60%] rounded-lg">
            <div className="h-3 rounded-3xl bg-default-200 animate-slow-pulse"></div>
          </Skeleton>
          <Skeleton className="w-[50%] mt-auto rounded-lg animate-slow-pulse">
            <div className="h-6 rounded bg-default-300"></div>
          </Skeleton>
        </Card>
      ))}

    </div>
  );
};

export default TableSkelton;
