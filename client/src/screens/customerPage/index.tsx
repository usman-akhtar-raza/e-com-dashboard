import { useMemo } from "react";
import { useGetCustomersQuery } from "../../state/api";
import Header from "../../components/Header";
import { useSelector } from "react-redux";

type Customer = {
  _id: string;
  name: string;
  email: string;
  phoneNumber: string;
  country: string;
  occupation: string;
  role: string;
};

export default function Customers() {
  const isSideBarOpen = useSelector(
    (state: { global: { isSideBarOpen: boolean } }) =>
      state.global.isSideBarOpen
  );

  const mode = useSelector(
    (state: { global: { mode: string } }) => state.global.mode
  );

  const { data, isLoading } = useGetCustomersQuery({});
  console.log(data);
  const appClasses = useMemo(
    () =>
      `min-h-screen ${
        mode === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
      }`,
    [mode]
  );

  if (isLoading) {
    return <div className="text-center py-4">...Loading</div>;
  }

  return (
    <div className={`ml-10 ${appClasses} p-6 `}>
      <Header title="Customers" subtitle="List of Customers" />
      <div
        className={` mt-10 max-w-screen overflow-auto  p-4 rounded-md ${
          mode === "dark" ? "bg-primary-300" : "bg-secondary-700"
        }`}
      >
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className=" text-gray-500">
              <th className="p-3">ID</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone Number</th>
              <th className="p-3">Country</th>
              <th className="p-3">Occupation</th>
              <th className="p-3">Role</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((row: Customer) => (
              <tr key={row._id} className="border-b border-gray-300">
                <td className="p-3">{row._id}</td>
                <td className="p-3">{row.name}</td>
                <td className="p-3">{row.email}</td>
                <td className="p-3">
                  {row.phoneNumber.replace(
                    /^(\d{3})(\d{3})(\d{4})$/,
                    "($1) $2-$3"
                  )}
                </td>
                <td className="p-3">{row.country}</td>
                <td className="p-3">{row.occupation}</td>
                <td className="p-3">{row.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
