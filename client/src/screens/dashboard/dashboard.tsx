// import React from 'react'
import { useSelector } from "react-redux";
import Header from "../../components/Header";
import BreakdownChart from "../../components/BreakdownChart";

import OverviewChart from "../../components/OverviewChart";
import { useGetDashboardQuery } from "../../state/api";


import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  flexRender
} from "@tanstack/react-table";

// Define your data type
type Transaction = {
  _id: string;
  userId: string;
  createdAt: string;
  products: string[];
  cost: number;
};

export default function Dashboard() {
  const { data, isLoading } = useGetDashboardQuery({});

  const mode=useSelector(
    (state:{global:{mode:string}})=>state.global.mode
  )

  const columns: ColumnDef<Transaction>[] = [
    { accessorKey: "_id", header: "ID" },
    { accessorKey: "userId", header: "User ID" },
    { accessorKey: "createdAt", header: "Created At" },
    {
      accessorKey: "products",
      header: "# of Products",
      cell: (info) => info.getValue<string[]>().length
    },
    {
      accessorKey: "cost",
      header: "Cost",
      cell: (info) => `$${Number(info.getValue<number>()).toFixed(2)}`
    }
  ];

  const table = useReactTable({
    data: data?.transactions || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  
  
  
  if(isLoading) return <div>...Loading</div>;
  return (
    <div className="ml-10">
      <Header title={"Dashboard"} subtitle={"All stats"} />
      <div className="grid grid-cols-12">
        <div className="mt-5 col-span-12 md:col-span-1 lg:col-span-4 gap-4 md:text-center space-y-1">
          <div className="grid col-span-12 md:col-span-4 lg:grid-cols-2  gap-10">
            <div
              className={`${
                mode === "dark" ? "bg-primary-300 " : "bg-secondary-700"
              } p-9 rounded-lg shadow-md`}
            >
              <h6 className="text-lg font-semibold">Total Revenue</h6>
              <h6 className="text-2xl font-bold">{`$ ${data.yearlySalesTotal}`}</h6>
            </div>
            <div
              className={`${
                mode === "dark" ? "bg-primary-300 " : "bg-secondary-700"
              } p-9 rounded-lg shadow-md`}
            >
              <h6 className="text-lg font-semibold">Total Sales</h6>
              <h6 className="text-2xl font-bold">{`$ ${data.yearlySalesTotal}`}</h6>
            </div>
            <div
              className={`${
                mode === "dark" ? "bg-primary-300 " : "bg-secondary-700"
              } p-9 rounded-lg shadow-md`}
            >
              <h6 className="text-lg font-semibold">Total Products</h6>
              <h6 className="text-2xl font-bold">{`$ ${data.yearlyTotalSoldUnits}`}</h6>
            </div>
            <div
              className={`${
                mode === "dark" ? "bg-primary-300 " : "bg-secondary-700"
              } p-9 rounded-lg shadow-md`}
            >
              <h6 className="text-lg font-semibold">Total Customers</h6>
              <h6 className="text-2xl font-bold">{`$ ${data.totalCustomers}`}</h6>
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-12 lg:col-span-8 p-4">
          <OverviewChart isDashboard={true} view={"sales"} />
        </div>
      </div>

      {/* ROW two */}

      {/* <div className="grid grid-cols-12"> */}
      <div className="grid grid-cols-10 gap-4 mt-6">
        <div className="col-span-12 md:col-span-12 lg:col-span-6  shadow p-4 h-96 scroll-m-px overflow-auto border rounded-lg">
          {isLoading ? (
            <p>Loading transactions...</p>
          ) : (
            <table className="w-full border-collapse border border-gray-200">
              <thead className="">
                <tr>
                  {table.getHeaderGroups().map((headerGroup) =>
                    headerGroup.headers.map((header) => (
                      <th key={header.id} className="border p-2">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </th>
                    ))
                  )}
                </tr>
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border hover:bg-gray-50">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="border p-2">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="col-span-12 lg:col-span-4 md:col-span-12 shadow p-4 md:mx-28 rounded-lg border">
          <h2 className="hidden sm:text-lg font-semibold">Sales By Category</h2>
          <BreakdownChart isDashboard={true} />
          <p className="text-sm mt-2">
            Breakdown of real states and information via category for revenue
            made for this year and total sales.
          </p>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}
