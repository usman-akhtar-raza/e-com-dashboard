import React from "react";

interface DataGridCustomToolbarProps {
  searchInput: string;
  setSearchInput: (value: string) => void;
  setSearch: (value: string) => void;
}

const DataGridCustomToolbar: React.FC<DataGridCustomToolbarProps> = ({
  searchInput,
  setSearchInput,
  setSearch,
}) => {
  return (
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
  );
};

export default DataGridCustomToolbar;
