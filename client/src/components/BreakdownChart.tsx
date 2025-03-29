import { ResponsivePie } from "@nivo/pie";

import { useGetSalesQuery } from "../state/api";
import { useSelector } from "react-redux";

const BreakdownChart = ({ isDashboard = false }) => {
  const { data, isLoading } = useGetSalesQuery({});
  const mode = useSelector(
    (state: { global: { mode: string } }) => state.global.mode
  );

  if (!data || isLoading) return "....Loading";
  const colors = [
    mode === "dark"
      ? ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"]
      : ["#0998FE", "#00i49F", "#FFBB28", "#FF8042", "#AF19FF"],
  ];
  const formattedData = Object.entries(data.salesByCategory).map(
    ([category, sales], i) => ({
      id: category,
      label: category,
      value: sales,
      color: colors[i],
    })
  );
  return (
    <div
      className={` ml-10 ${!isDashboard === true ? "h-[700px]" : "h-[400px]"}`}
    >
      <ResponsivePie
        data={formattedData}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: mode === "dark" ? "#a6a9be" : "#c2c2c2", // using primary-200 for dark and grey-200 for light
              },
            },
            legend: {
              text: {
                fill: mode === "dark" ? "#a6a9be" : "#c2c2c2", // using primary-200 for dark and grey-200 for light
              },
            },
            ticks: {
              line: {
                stroke: mode === "dark" ? "#a6a9be" : "#c2c2c2", // using primary-200 for dark and grey-200 for light
                strokeWidth: 1,
              },
              text: {
                fill: mode === "dark" ? "#a6a9be" : "#c2c2c2", // using primary-200 for dark and grey-200 for light
              },
            },
          },
          legends: {
            text: {
              fill: mode === "dark" ? "#a6a9be" : "#c2c2c2", // using primary-200 for dark and grey-200 for light
            },
          },
          tooltip: {
            container: {
              color: mode === "dark" ? "#0088FE" : "#0998FE", // using primary main for dark and light
            },
          },
        }}
        margin={
          isDashboard
            ? { top: 40, right: 80, bottom: 100, left: 50 }
            : { top: 40, right: 80, bottom: 80, left: 80 }
        }
        sortByValue={true}
        innerRadius={0.45}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        enableArcLinkLabels={!isDashboard}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateX: isDashboard ? 20 : 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 85,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
            effects: [
              {
                on: "hover",
                style: {
                  itemTextColor: "primary-400",
                },
              },
            ],
          },
        ]}
      />
      <div
        className="absolute  text-center pointer-events-none"
        style={{
          top: "53%",
          left: "53%",
          transform: isDashboard
            ? "translate(-75%, -170%)"
            : "translate(-50%, -100%)",
        }}
      >
        <h6 className="text-lg font-semibold">
          {!isDashboard && (
            <span className="text-xl font-bold">
              {`Total Sales: $${data.yearlySalesTotal}`}
            </span>
          )}
        </h6>
      </div>
    </div>
  );
};
export default BreakdownChart;
