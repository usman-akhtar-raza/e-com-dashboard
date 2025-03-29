// import React from 'react'
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import BreakdownChart from "../../components/BreakdownChart";

import OverviewChart from "../../components/OverviewChart";
import { useGetDashboardQuery } from "../../state/api";
OverviewChart;
export default function Dashboard() {
  const { data, isLoading } = useGetDashboardQuery({});
  const mode=useSelector(
    (state:{global:{mode:string}})=>state.global.mode
  )
  console.log(data);
  if(isLoading) return <div>...Loading</div>;
  return (
    <div className="ml-10">
      <Header title={"Dashboard"} subtitle={"All stats"} />
      <div className="grid grid-cols-12">
        <div className="mt-5 cols-span-12 md:col-span-12 lg:col-span-4 gap-4 md:text-center space-y-1">
          <div className="grid grid-cols-2 gap-4">
            <div className={`${mode==="dark" ?"bg-primary-300 ":"bg-secondary-700"} p-4 rounded-lg shadow-md`}>
              <h6 className="text-lg font-semibold">Total Revenue</h6>
              <h6 className="text-2xl font-bold">{`$ ${data.yearlySalesTotal}`}</h6>
            </div>
            <div className={`${mode==="dark" ?"bg-primary-300 ":"bg-secondary-700"} p-4 rounded-lg shadow-md`}>
              <h6 className="text-lg font-semibold">Total Sales</h6>
              <h6 className="text-2xl font-bold">{`$ ${data.yearlySalesTotal}`}</h6>
            </div>
            <div className={`${mode==="dark" ?"bg-primary-300 ":"bg-secondary-700"} p-4 rounded-lg shadow-md`}>
              <h6 className="text-lg font-semibold">Total Products</h6>
              <h6 className="text-2xl font-bold">{`$ ${data.yearlyTotalSoldUnits}`}</h6>
            </div>
            <div className={`${mode==="dark" ?"bg-primary-300 ":"bg-secondary-700"} p-4 rounded-lg shadow-md`}>
              <h6 className="text-lg font-semibold">Total Customers</h6>
              <h6 className="text-2xl font-bold">{`$ ${data.totalCustomers}`}</h6>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-8 p-4">
          <OverviewChart isDashboard={true} view={"sales"} />
        </div>
      </div>
    </div>
  );
}
