// import React from "react";
// import { useGetAdminsQuery } from "../../state/api";
// import Header from "../../components/Header";

// export default function Admin() {
//   const { data, isLoading } = useGetAdminsQuery({});
//   console.log(data);
//   return (
//     <div className="ml-10">
//       <Header title={"Admin"} subtitle={"Managing admins and admins list"} />
//     </div>
//   );
// }

import React from "react";
import { useGetAdminsQuery } from "../../state/api";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Header from "../../components/Header";
import { useSelector } from "react-redux";

const Admin: React.FC = () => {
  const { data, isLoading } = useGetAdminsQuery({});
    const mode = useSelector(
        (state:{global:{mode:string}})=>state.global.mode
    )
  const columns: ColumnDef<any>[] = [
    { accessorKey: "_id", header: "ID" },
    { accessorKey: "name", header: "Name" },
    { accessorKey: "email", header: "Email" },
    {
      accessorKey: "phoneNumber",
      header: "Phone Number",
      cell: (props) =>
        props
          .getValue<string>()
          .replace(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/, "($1) $2-$3"),
    },
    { accessorKey: "country", header: "Country" },
    { accessorKey: "occupation", header: "Occupation" },
    { accessorKey: "role", header: "Role" },
  ];

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-6">
      <Header title={"Admin"} subtitle={"Managing admins and admins list"} />
      <div
        className={`m-6 h-[75vh] ${
          mode === "dark" ? "bg-primary-500 " : "bg-secondary-800"
        } shadow-md rounded-lg p-4 overflow-auto`}
      >
        {isLoading ? (
          <p className="text-center ">Loading...</p>
        ) : (
          <table className="w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="text-left p-2">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-2">
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
    </div>
  );
};

export default Admin;
