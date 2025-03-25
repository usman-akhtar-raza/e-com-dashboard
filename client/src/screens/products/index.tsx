import { useState } from "react";
import { useGetProductsQuery } from "../../state/api";
import Header from "../../components/Header";
import { useSelector } from "react-redux";

interface ProductProps {
  _id: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  supply: number;
  stat: {
    yearlySalesTotal: number;
    yearlyTotalSoldUnits: number;
  };
}

const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,
}: ProductProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const mode = useSelector(
    (state: { global: { mode: string } }) => state.global.mode
  );
  return (
    <div
      className={`${
        mode === "dark" ? "dark bg-primary-300" : "bg-secondary-600"
      }  shadow-md rounded-lg p-4 `}
    >
      <div className="mb-4">
        <p className="text-sm text-gray-600">{category}</p>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-500">${Number(price).toFixed(2)}</p>
        <div className="flex items-center gap-1 text-yellow-500">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i}>{i < rating ? "★" : "☆"}</span>
          ))}
        </div>
        <p className="text-sm text-gray-700 mt-2">{description}</p>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? "See Less" : "See More"}
      </button>
      {isExpanded && (
        <div className="mt-4 text-gray-700">
          <p>
            <strong>ID:</strong> {_id}
          </p>
          <p>
            <strong>Supply Left:</strong> {supply}
          </p>
          <p>
            <strong>Yearly Sales:</strong> {stat.yearlySalesTotal}
          </p>
          <p>
            <strong>Units Sold:</strong> {stat.yearlyTotalSoldUnits}
          </p>
        </div>
      )}
    </div>
  );
};

const Products = () => {
  const { data, isLoading } = useGetProductsQuery({});

  return (
    <div className="m-6">
      <Header title="PRODUCTS" subtitle="See your list of products." />
      {data || !isLoading ? (
        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.map(
            ({
              _id,
              name,
              description,
              price,
              rating,
              category,
              supply,
              stat,
            }: ProductProps) => (
              <Product
                key={_id}
                _id={_id}
                name={name}
                description={description}
                price={price}
                rating={rating}
                category={category}
                supply={supply}
                stat={stat}
              />
            )
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500">Loading...</p>
      )}
    </div>
  );
};

export default Products;
