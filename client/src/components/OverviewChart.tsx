

import React, { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useGetSalesQuery } from "../state/api";
import { useSelector } from "react-redux";

interface OverviewChartProps {
  isDashboard?: boolean;
  view: "sales" | "units";
}

const OverviewChart: React.FC<OverviewChartProps> = ({
  isDashboard = false,
  view,
}) => {
  const { data, isLoading } = useGetSalesQuery({});
const mode =useSelector(
  (state:{global:{mode:string}})=>state.global.mode
)
  const { totalSalesLine, totalUnitsLine } = useMemo(() => {
    if (!data) return {
      totalSalesLine: { id: "totalSales", color: "#1f78b4", data: [] },
      totalUnitsLine: { id: "totalUnits", color: "#33a02c", data: [] }
    };

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
    <div
      className={`mx-24 h-[700px] ${
        mode === "dark" ? "bg-primary-300" : ""
      }  p-4 rounded-lg shadow-md`}
    >
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

