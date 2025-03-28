import React from 'react'
import { useGetPerformanceQuery } from '../../state/api'
import { useSelector } from 'react-redux';

export default function Performance() {
  const userId = useSelector((state: { global: { userId: string } }) => state.global.userId);
  const { data, isLoading } = useGetPerformanceQuery(userId); // Pass the userId here
  console.log(data);
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <div className='ml-10'>Performance</div>
  )
}
