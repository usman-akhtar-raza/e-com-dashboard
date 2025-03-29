import React from "react";
// import { LucideIcon } from "lucide-react";

type StatBoxProps = {
  title: string;
  value: string | number;
  increase: string;
  icon: React.ReactNode;
  description: string;
};

const StatBox: React.FC<StatBoxProps> = ({
  title,
  value,
  increase,
  icon,
  description,
}) => {
  return (
    <div className="col-span-2 row-span-1 flex flex-col justify-between p-5 bg-gray-800 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <h6 className="text-gray-400 text-lg font-semibold">{title}</h6>
        {icon} 
      </div>

      <h3 className="text-3xl font-bold text-gray-300">{value}</h3>
      <div className="flex items-center gap-4">
        <p className="text-lg italic text-green-400">{increase}</p>
        <p className="text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default StatBox;
