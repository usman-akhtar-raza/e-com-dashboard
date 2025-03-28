

import React, { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";

import "react-datepicker/dist/react-datepicker.css";
import { useGetSalesQuery } from "../../state/api";
import Header from "../../components/Header";
import { useSelector } from "react-redux";

const Monthly: React.FC = () => {
    const mode =useSelector(
        (state:{global:{mode:string}})=>state.global.mode
    )
  
  const { data } = useGetSalesQuery({});

  const formattedData = useMemo(() => {
    if (!data) return [];

    const { monthlyData } = data;
    const totalSalesLine = {
      id: "totalSales",
      color: "#3b82f6",
      data: [] as { x: string; y: number }[],
    };
    const totalUnitsLine = {
      id: "totalUnits",
      color: "#9333ea",
      data: [] as { x: string; y: number }[],
    };

    Object.values(monthlyData).forEach(({ month, totalSales, totalUnits }) => {
     
        totalSalesLine.data.push({ x: month, y: totalSales });
        totalUnitsLine.data.push({ x: month, y: totalUnits });
      
    });

    return [totalSalesLine, totalUnitsLine];
  }, [data]);

  return (
    <div className="m-6">
      <Header title="Monthly SALES" subtitle="Chart of monthly sales" />

      <div
        className={`h-[75vh]  ${
          mode === "dark" ? "bg-primary-400 text-black" : "bg-secondary-800"
        }`}
      >
       

        {data ? (
          <ResponsiveLine
            data={formattedData}
            margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
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
            axisBottom={{
              //   orient: "bottom",
              tickSize: 5,
              tickPadding: 18,
              tickRotation: 90,
              legend: "Month",
              legendOffset: 60,
              legendPosition: "middle",
              format: (v) => v.slice(0, 3),
            }}
            axisLeft={{
              //   orient: "left",
              tickSize: 5,
              tickPadding: 5,
              legend: "Total",
              legendOffset: -50,
              legendPosition: "middle",
            }}
            colors={
              mode === "dark"
                ? ["#21295c", "#6baed6", "#414c6b", "#9ecae1", "#636363"]
                : ["brown", "black", "#414c6b", "#9ecae1", "#636364"]
            }
            lineWidth={6}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            useMesh={true}
            legends={[
              {
                anchor: "top-right",
                direction: "column",
                translateX: 50,
                translateY: 0,
                itemsSpacing: 0,
                itemWidth: 80,
                itemHeight: 20,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
              },
            ]}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Monthly;
