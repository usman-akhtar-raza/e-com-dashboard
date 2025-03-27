// import React, { useMemo, useState } from "react";
// import Header from "../../components/Header";
// import OverviewChart from "../../components/OverviewChart";
// import { useGetSalesQuery } from "../../state/api";
// import DatePicker from "react-datepicker";

// export default function Daily() {
//   const [startDate, setStartDate] = useState(new Date("2025-02-01"));

//   const [endDate, setEndtDate] = useState(new Date("2025-03-01"));
//   const { data } = useGetSalesQuery({});

//   const [formattedData] = useMemo(() => {
//     if (!data) return [];
//     const {dailyData} =data
//   }, [data]); //eslint-disable-line react-hooks/exhaustive-deps
//   return <div>Daily</div>;
// }

import React, { useMemo, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGetSalesQuery } from "../../state/api";
import Header from "../../components/Header";
import { useSelector } from "react-redux";

const Daily: React.FC = () => {
    const mode =useSelector(
        (state:{global:{mode:string}})=>state.global.mode
    )
  const [startDate, setStartDate] = useState<Date>(new Date("2021-02-01"));
  const [endDate, setEndDate] = useState<Date>(new Date("2021-03-01"));
  const { data } = useGetSalesQuery({});

  const formattedData = useMemo(() => {
    if (!data) return [];

    const { dailyData } = data;
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

    Object.values(dailyData).forEach(({ date, totalSales, totalUnits }) => {
      const dateFormatted = new Date(date);
      if (dateFormatted >= startDate && dateFormatted <= endDate) {
        const splitDate = date.substring(date.indexOf("-") + 1);
        totalSalesLine.data.push({ x: splitDate, y: totalSales });
        totalUnitsLine.data.push({ x: splitDate, y: totalUnits });
      }
    });

    return [totalSalesLine, totalUnitsLine];
  }, [data, startDate, endDate]);

  return (
    <div className="m-6">
      <Header title="DAILY SALES" subtitle="Chart of daily sales" />

      <div
        className={`h-[75vh]  ${
          mode === "dark" ? "bg-primary-400 text-black" : "bg-secondary-800"
        }`}
      >
        <div className="flex justify-end space-x-4 py-2">
          <DatePicker
            selected={startDate}
            onChange={(date) => date && setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="border p-2 rounded"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => date && setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="border p-2 rounded"
          />
        </div>

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

export default Daily;
