

import { useGetGeographyQuery } from "../../state/api";
import { geoData } from "../../state/geoData";
import Header from "../../components/Header";
import { ResponsiveChoropleth } from "@nivo/geo";
import React from "react";

interface GeographyProps {}

const Geography: React.FC<GeographyProps> = () => {

  const { data } = useGetGeographyQuery({});

  return (
    <div className="ml-10">
      <Header
        title={"Geography"}
        subtitle={"Find where are your users are located"}
      />
      <div className="mt-10 h-[75vh] mx-6 border border-gray-300 rounded-md">
        {data ? (
           <ResponsiveChoropleth
            data={data}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: "#a0aec0",
                  },
                },
                legend: {
                  text: {
                    fill: "#a0aec0",
                  },
                },
                ticks: {
                  line: {
                    stroke: "#a0aec0",
                    strokeWidth: 1,
                  },
                  text: {
                    fill: "#a0aec0",
                  },
                },
              },
              legends: {
                text: {
                  fill: "#a0aec0",
                },
              },
              tooltip: {
                container: {
                  color: "#1a202c",
                },
              },
            }}
            features={geoData.features}
            margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
            domain={[0, 60]}
            unknownColor="#666666"
            label="properties.name"
            valueFormat=".2s"
            projectionScale={150}
            projectionTranslation={[0.45, 0.6]}
            projectionRotation={[0, 0, 0]}
            borderWidth={1.3}
            borderColor="#ffffff"
            legends={[
              {
                anchor: "bottom-right",
                direction: "column",
                justify: true,
                translateX: 0,
                translateY: -125,
                itemsSpacing: 0,
                itemWidth: 94,
                itemHeight: 18,
                itemDirection: "left-to-right",
                itemTextColor: "#a0aec0",
                itemOpacity: 0.85,
                symbolSize: 18,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemTextColor: "#2d3748",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        ) : (
          <div className="text-center mt-10 text-3xl font-bold">...Loading</div>
        )}
      </div>
    </div>
  );
};

export default Geography;
