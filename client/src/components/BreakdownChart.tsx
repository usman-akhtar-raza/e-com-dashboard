import { ResponsivePie } from "@nivo/pie";
import { useGetSalesQuery } from "../state/api";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const BreakdownChart = ({ isDashboard = false }) => {
  const { data, isLoading } = useGetSalesQuery({});
  const mode = useSelector(
    (state: { global: { mode: string } }) => state.global.mode
  );
  const [isMobile, setIsMobile] = useState(window.innerWidth < 500);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 500);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
      className={`w-full ${isMobile ? 'mx-2' : 'ml-10'} ${
        !isDashboard === true ? "h-[700px]" : "h-[400px]"
      }`}
    >
      <ResponsivePie
        data={formattedData}
        theme={{
          axis: {
            domain: {
              line: {
                stroke: mode === "dark" ? "#a6a9be" : "#c2c2c2",
              },
            },
            legend: {
              text: {
                fill: mode === "dark" ? "#a6a9be" : "#c2c2c2",
              },
            },
            ticks: {
              line: {
                stroke: mode === "dark" ? "#a6a9be" : "#c2c2c2",
                strokeWidth: 1,
              },
              text: {
                fill: mode === "dark" ? "#a6a9be" : "#c2c2c2",
              },
            },
          },
          legends: {
            text: {
              fill: mode === "dark" ? "#a6a9be" : "#c2c2c2",
            },
          },
          tooltip: {
            container: {
              color: mode === "dark" ? "#0088FE" : "#0998FE",
            },
          },
        }}
        margin={
          isDashboard
            ? { 
                top: 40, 
                right: isMobile ? 20 : 80, 
                bottom: isMobile ? 120 : 100, 
                left: isMobile ? 20 : 50 
              }
            : { 
                top: 40, 
                right: isMobile ? 20 : 80, 
                bottom: isMobile ? 100 : 80, 
                left: isMobile ? 20 : 80 
              }
        }
        sortByValue={true}
        innerRadius={0.45}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={isMobile ? 4 : 8}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        enableArcLinkLabels={!isDashboard && !isMobile}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: "color" }}
        arcLabelsSkipAngle={isMobile ? 15 : 10}
        arcLabelsTextColor={{
          from: "color",
          modifiers: [["darker", 2]],
        }}
        legends={[
          {
            anchor: "bottom",
            direction: isMobile ? "column" : "row",
            justify: false,
            translateX: isDashboard ? (isMobile ? 0 : 20) : 0,
            translateY: isMobile ? 0 : 56,
            itemsSpacing: isMobile ? 5 : 0,
            itemWidth: isMobile ? 60 : 85,
            itemHeight: 18,
            itemTextColor: "#999",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: isMobile ? 12 : 18,
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
        className="absolute text-center pointer-events-none"
        style={{
          top: "53%",
          left: isMobile ? "50%" : "53%",
          transform: isDashboard
            ? "translate(-75%, -170%)"
            : isMobile
            ? "translate(-50%, -50%)"
            : "translate(-50%, -100%)",
        }}
      >
        <h6 className="text-lg font-semibold">
          {!isDashboard && (
            <span className={`${isMobile ? 'text-base' : 'text-xl'} font-bold`}>
              {`Total Sales: $${data.yearlySalesTotal}`}
            </span>
          )}
        </h6>
      </div>
    </div>
  );
};

export default BreakdownChart;
