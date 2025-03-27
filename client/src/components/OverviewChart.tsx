

import React, { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useGetSalesQuery } from "../state/api";

interface OverviewChartProps {
  isDashboard?: boolean;
  view: "sales" | "units";
}

const OverviewChart: React.FC<OverviewChartProps> = ({
  isDashboard = false,
  view,
}) => {
  const { data, isLoading } = useGetSalesQuery({});

  const {totalSalesLine, totalUnitsLine} = useMemo(() => {
    if (!data) return [[], []];

    const { monthlyData } = data;
    const totalSalesLine = {
      id: "totalSales",
      color: "#1f78b4",
      data: [] as { x: string; y: number }[],
    };
    const totalUnitsLine = {
      id: "totalUnits",
      color: "#33a02c",
      data: [] as { x: string; y: number }[],
    };

    monthlyData.reduce(
      (
        acc: { sales: number; units: number; },
        {
          month,
          totalSales,
          totalUnits,
        }: { month: string; totalSales: number; totalUnits: number }
      ) => {
        const curSales = acc.sales + totalSales;
        const curUnits = acc.units + totalUnits;

        totalSalesLine.data.push({ x: month, y: curSales });
        totalUnitsLine.data.push({ x: month, y: curUnits });

        return { sales: curSales, units: curUnits };
      },
      { sales: 0, units: 0 }
    );

    return { totalSalesLine, totalUnitsLine };
  }, [data]);

  if (!data || isLoading)
    return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="mx-24 h-[700px] text-black bg-white p-4 rounded-lg shadow-md">
      <ResponsiveLine
      data={[view === "sales" ? totalSalesLine : totalUnitsLine]}
        // data={view === "sales" ? [totalSalesLine] : [totalUnitsLine]}
        margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: false,
          reverse: false,
        }}
        yFormat=" >-.2f"
        curve="catmullRom"
        enableArea={isDashboard}
        axisBottom={{
          format: (v) => (isDashboard ? v.slice(0, 3) : v),
        //   orient: "bottom",
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? "" : "Month",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
        //   orient: "left",
          tickValues: 5,
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard
            ? ""
            : `Total ${view === "sales" ? "Revenue" : "Units"} for Year`,
          legendOffset: -60,
          legendPosition: "middle",
        }}
        enableGridX={false}
        enableGridY={false}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={
          !isDashboard
            ? [
                {
                  anchor: "bottom-right",
                  direction: "column",
                  translateX: 30,
                  translateY: -40,
                  itemsSpacing: 0,
                  itemDirection: "left-to-right",
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: "circle",
                  symbolBorderColor: "rgba(0, 0, 0, .5)",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemBackground: "rgba(0, 0, 0, .03)",
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]
            : undefined
        }
      />
    </div>
  );
};

export default OverviewChart;


// import React, { useMemo } from "react";
// import { ResponsiveLine } from "@nivo/line";
// import { useGetSalesQuery } from "../state/api";

// type OverviewChartProps = {
//   isDashboard?: boolean;
//   view: "sales" | "units";
// };

// type MonthlyData = {
//   month: string;
//   totalSales: number;
//   totalUnits: number;
// };

// const OverviewChart: React.FC<OverviewChartProps> = ({
//   isDashboard = false,
//   view,
// }) => {
//   const { data, isLoading } = useGetSalesQuery({});

//   console.log("API Data:", data);

//   const { totalSalesLine, totalUnitsLine } = useMemo(() => {
//     if (!data || !data.monthlyData) {
//       console.warn("No data available");
//       return { totalSalesLine: null, totalUnitsLine: null };
//     }

//     const totalSalesLine = {
//       id: "totalSales",
//       color: "#3b82f6",
//       data: [] as { x: string; y: number }[],
//     };

//     const totalUnitsLine = {
//       id: "totalUnits",
//       color: "#6b7280",
//       data: [] as { x: string; y: number }[],
//     };

//     let cumulativeSales = 0;
//     let cumulativeUnits = 0;

//     data.monthlyData.forEach(
//       ({ month, totalSales, totalUnits }: MonthlyData) => {
//         cumulativeSales += totalSales;
//         cumulativeUnits += totalUnits;

//         totalSalesLine.data.push({ x: month, y: cumulativeSales });
//         totalUnitsLine.data.push({ x: month, y: cumulativeUnits });
//       }
//     );

//     return { totalSalesLine, totalUnitsLine }; // FIX: Correct return structure
//   }, [data]);

//   console.log("Processed Sales Data:", totalSalesLine);
//   console.log("Processed Units Data:", totalUnitsLine);
// //   console.log("Processed Data:", JSON.stringify(totalSalesLine, null, 2));
// //   console.log("Processed Data:", JSON.stringify(totalUnitsLine, null, 2));


//   if (isLoading || !totalSalesLine || !totalUnitsLine) return <p>Loading...</p>;
//  const dummyData = [
//     {
//       id: "test",
//       color: "#ff0000",
//       data: [
//         { x: "Jan", y: 100 },
//         { x: "Feb", y: 200 },
//         { x: "Mar", y: 300 },
//         { x: "apr", y: 400 },
//         { x: "jun", y: 500 },
//         { x: "jul", y: 600 },
//         { x: "aug", y: 700 },
//         { x: "sep", y: 800 },
//         { x: "oct", y: 900 },
//         { x: "nov", y: 1000 },
//         { x: "dec", y: 1100 },
//         { x: "may", y: 1200 },
//       ],
//     },
//   ];
//   return (
//     <div className="max-w-screen max-h-screen ">
//       {data ? (
//         <ResponsiveLine
//         //   data={[view === "sales" ? totalSalesLine : totalUnitsLine]}
//           data={[view === "sales" ? totalSalesLine : totalUnitsLine]}
//           margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
//           xScale={{ type: "point" }}
//           yScale={{
//             type: "linear",
//             min: "auto",
//             max: "auto",
//             stacked: false,
//             reverse: false,
//           }}
//           yFormat=">-.2f"
//           curve="catmullRom"
//           enableArea={isDashboard}
//           axisTop={null}
//           axisRight={null}
//           axisBottom={{
//             format: (v) => (isDashboard ? v.slice(0, 3) : v),
//             tickSize: 5,
//             tickPadding: 5,
//             tickRotation: 0,
//             legend: isDashboard ? "" : "Month",
//             legendOffset: 36,
//             legendPosition: "middle",
//           }}
//           axisLeft={{
//             tickValues: 5,
//             tickSize: 5,
//             tickPadding: 5,
//             tickRotation: 0,
//             legend: isDashboard
//               ? ""
//               : `Total ${view === "sales" ? "Revenue" : "Units"} for Year`,
//             legendOffset: -60,
//             legendPosition: "middle",
//           }}
//           enableGridX={false}
//           enableGridY={false}
//           pointSize={10}
//           pointColor={{ theme: "background" }}
//           pointBorderWidth={2}
//           pointBorderColor={{ from: "serieColor" }}
//           pointLabelYOffset={-12}
//           useMesh={true}
//           legends={
//             isDashboard
//               ? [
//                   {
//                     anchor: "bottom-right",
//                     direction: "column",
//                     justify: false,
//                     translateX: 30,
//                     translateY: -40,
//                     itemsSpacing: 0,
//                     itemDirection: "left-to-right",
//                     itemWidth: 80,
//                     itemHeight: 20,
//                     itemOpacity: 0.75,
//                     symbolSize: 12,
//                     symbolShape: "circle",
//                     symbolBorderColor: "rgba(0, 0, 0, .5)",
//                     effects: [
//                       {
//                         on: "hover",
//                         style: {
//                           itemBackground: "rgba(0, 0, 0, .03)",
//                           itemOpacity: 1,
//                         },
//                       },
//                     ],
//                   },
//                 ]
//               : undefined
//           }
//         />
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default OverviewChart;

