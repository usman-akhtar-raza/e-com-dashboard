import React from "react";
import { useSelector } from "react-redux";
import { useGetPerformanceQuery } from "../../state/api";
import { 
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import Header from "../../components/Header";

const Performance = () => {
  const userId = useSelector(
    (state: { global: { userId: string } }) => state.global.userId
  );
  const { data, isLoading } = useGetPerformanceQuery(userId);
const mode =useSelector(
  (state:{global:{mode:string}})=>state.global.mode
)
  const rows = data?.sales ?? [];

  const columns = [
    { accessorKey: "_id", header: "ID" },
    { accessorKey: "userId", header: "User ID" },
    { accessorKey: "createdAt", header: "Created At" },
    {
      accessorKey: "products",
      header: "# of Products",
      cell: (info: { getValue: () => { (): any; new(): any; length: any; }; }) => info.getValue().length,
    },
    {
      accessorKey: "cost",
      header: "Cost",
      cell: (info: { getValue: () => any; }) => `$${Number(info.getValue()).toFixed(2)}`,
    },
  ];

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel()
  });

  if (isLoading) return <p className="text-center text-gray-600">Loading...</p>;
  if (!data?.sales?.length)
    return <p className="text-center text-gray-600">No data available</p>;

  return (
    <div className="p-6">
      <Header
        title={"Performance"}
        subtitle={"Track your affiliate sales performance here"}
      />
      <div
        className={`m-6 h-[75vh] ${
          mode === "dark" ? "bg-primary-500 " : "bg-secondary-800"
        } shadow-md rounded-lg p-4 overflow-auto`}
      >
        <table className="max-w-screen border mt-4 overflow-auto">
          <thead className="">
            {table
              .getHeaderGroups()
              .map(
                (headerGroup: {
                  id: React.Key | null | undefined;
                  headers: any[];
                }) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map(
                      (header: {
                        id: React.Key | null | undefined;
                        column: {
                          columnDef: {
                            header:
                              | string
                              | number
                              | bigint
                              | boolean
                              | React.ReactElement<
                                  unknown,
                                  string | React.JSXElementConstructor<any>
                                >
                              | Iterable<React.ReactNode>
                              | React.ReactPortal
                              | Promise<
                                  | string
                                  | number
                                  | bigint
                                  | boolean
                                  | React.ReactPortal
                                  | React.ReactElement<
                                      unknown,
                                      string | React.JSXElementConstructor<any>
                                    >
                                  | Iterable<React.ReactNode>
                                  | null
                                  | undefined
                                >
                              | null
                              | undefined;
                          };
                        };
                      }) => (
                        <th key={header.id} className="p-2 border">
                          {header.column.columnDef.header}
                        </th>
                      )
                    )}
                  </tr>
                )
              )}
          </thead>
          <tbody>
            {table
              .getRowModel()
              .rows.map(
                (row: {
                  id: React.Key | null | undefined;
                  getVisibleCells: () => any[];
                }) => (
                  <tr key={row.id} className="border-b">
                    {row
                      .getVisibleCells()
                      .map(
                        (cell: {
                          id: React.Key | null | undefined;
                          renderValue: () =>
                            | string
                            | number
                            | bigint
                            | boolean
                            | React.ReactElement<
                                unknown,
                                string | React.JSXElementConstructor<any>
                              >
                            | Iterable<React.ReactNode>
                            | React.ReactPortal
                            | Promise<
                                | string
                                | number
                                | bigint
                                | boolean
                                | React.ReactPortal
                                | React.ReactElement<
                                    unknown,
                                    string | React.JSXElementConstructor<any>
                                  >
                                | Iterable<React.ReactNode>
                                | null
                                | undefined
                              >
                            | null
                            | undefined;
                        }) => (
                          <td key={cell.id} className="p-2 border">
                            {cell.renderValue()}
                          </td>
                        )
                      )}
                  </tr>
                )
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Performance;
