import React, { useState } from "react";
import { useGetTransactionQuery } from "../../state/api";
import Header from "../../components/Header";
// import DataGridCustomToolbar from "../../components/DataGridCustomToolbar";

interface Transaction {
  _id: string;
  userId: string;
  createdAt: string;
  products: string[];
  cost: number;
}

// interface TransactionsResponse {
//   transactions: Transaction[];
//   total: number;
// }

const Transactions: React.FC = () => {
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(20);
  const [sort, setSort] = useState<Record<string, string>>({});
  const [search, setSearch] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");

  const { data, isLoading } = useGetTransactionQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  });
  console.log(data);
  if (isLoading) {
    return <div className="ml-36">...loading</div>;
  }

  // Add null check for data
  if (!data?.transactions) {
    return <div>No transactions found</div>;
  }

  return (
    <div className="p-6">
      <Header title="TRANSACTIONS" subtitle="Entire list of transactions" />
      <div className=" max-w-screen p-4 rounded-lg border">
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
          />
          <button
            onClick={() => setSearch(searchInput)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500"
          >
            Search
          </button>
        </div>
        <table className="w-full text-left border-collapse border border-gray-600">
          <thead>
            <tr className="">
              <th className="p-2 border border-gray-600">ID</th>
              <th className="p-2 border border-gray-600">User ID</th>
              <th className="p-2 border border-gray-600">Created At</th>
              <th className="p-2 border border-gray-600"># of Products</th>
              <th className="p-2 border border-gray-600">Cost</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} className="text-center p-4">
                  Loading...
                </td>
              </tr>
            ) : (
              data?.transactions.map((transaction: Transaction) => (
                <tr key={transaction._id} className="hover:bg-gray-600">
                  <td className="p-2 border border-gray-600">
                    {transaction._id}
                  </td>
                  <td className="p-2 border border-gray-600">
                    {transaction.userId}
                  </td>
                  <td className="p-2 border border-gray-600">
                    {transaction.createdAt}
                  </td>
                  <td className="p-2 border border-gray-600">
                    {transaction.products.length}
                  </td>
                  <td className="p-2 border border-gray-600">
                    ${transaction.cost}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
          >
            Previous
          </button>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transactions;

// import { useSelector } from "react-redux";
// import { useGetTransactionQuery } from "../../state/api";
// import { useState } from "react";
// import Header from "../../components/Header";

// export default function Transaction() {
//   const isSideBarOpen = useSelector(
//     (state: { global: { isSideBarOpen: boolean } }) =>
//       state.global.isSideBarOpen
//   );
//   const { data, isLoading } = useGetTransactionQuery({
//     page,
//     pageSize,
//     sort: JSON.stringify(sort),
//     search,
//   });
//   const columns: GridColDef[] = [
//     { field: "_id", headerName: "ID", flex: 1 },
//     { field: "userId", headerName: "User ID", flex: 1 },
//     { field: "createdAt", headerName: "Created At", flex: 1 },
//     {
//       field: "products",
//       headerName: "# of Products",
//       flex: 0.5,
//       sortable: false,
//       renderCell: (params) => params.value.length,
//     },
//     {
//       field: "cost",
//       headerName: "Cost",
//       flex: 1,
//       renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
//     },
//   ];
//   return (
//     <div className={`ml-10 ${isSideBarOpen === true ? "ml-36" : ""}`}>
//       <div className="m-6">
//         <Header title="TRANSACTIONS" subtitle="Entire list of transactions" />
//         <div className="h-[80vh] bg-gray-800 text-white p-4 rounded-lg shadow-lg">
//           <DataGrid
//             loading={isLoading || !data}
//             getRowId={(row) => row._id}
//             rows={data?.transactions || []}
//             columns={columns}
//             rowCount={data?.total || 0}
//             pageSize={pageSize}
//             paginationMode="server"
//             sortingMode="server"
//             onPageChange={(newPage) => setPage(newPage)}
//             onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
//             onSortModelChange={(newSortModel) => setSort(newSortModel[0] || {})}
//             components={{ Toolbar: DataGridCustomToolbar }}
//             componentsProps={{
//               toolbar: { searchInput, setSearchInput, setSearch },
//             }}
//             className="bg-gray-900 text-white border-none"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
