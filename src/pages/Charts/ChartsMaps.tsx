import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Button from "../../Components/Button/Button";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface dataWiseCasesMap {
  name: string;
  cases: number;
  deaths: number;
  recovered: number;
}

function ChartsMaps() {
  const [mapData, setMapData] = useState<dataWiseCasesMap[]>([]);
  const [filterData, setFilterData] = useState<"Daily" | "Weekly" | "Monthly">(
    "Daily"
  );
  const { isLoading, data } = useQuery("repoData", () =>
    fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=all").then(
      (res) => res.json()
    )
  );

  useEffect(() => {
    if (!isLoading) {
      const tempData = data
        ? Object.keys(data["cases"]).map((item) => {
            return {
              name: item,
              cases: data["cases"][item],
              deaths: data["deaths"][item],
              recovered: data["recovered"][item],
            };
          })
        : [];

      const mapData = tempData.filter((data, index) => {
        if (filterData === "Monthly") {
          if (index % 30 === 0) {
            return data;
          }
        } else if (filterData === "Weekly") {
          if (index % 7 === 0) {
            return data;
          }
        } else {
          return data;
        }
      });
      setMapData(mapData);
    }
  }, [data, isLoading, filterData]);

  return (
    <div className="flex flex-col justify-around overflow-x-scroll">
      <div className="flex h-10 m-10 gap-4">
        <Button
          text="Weekly"
          onClick={() => setFilterData("Weekly")}
          type={filterData === "Weekly" ? "primary" : "secondary"}
        />
        <Button
          text="Monthly"
          onClick={() => setFilterData("Monthly")}
          type={filterData === "Monthly" ? "primary" : "secondary"}
        />
        <Button
          text="Daily"
          onClick={() => setFilterData("Daily")}
          type={filterData === "Daily" ? "primary" : "secondary"}
        />
      </div>
      <div className="flex justify-start items-center flex-1 border-l-2 ">
        <LineChart
          width={1500}
          height={500}
          data={mapData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis interval={1} dataKey="cases" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="cases" stroke="#82ca9d" />
          <Line type="monotone" dataKey="deaths" stroke="#FF0000" />
          <Line type="monotone" dataKey="recovered" stroke="#0000FF" />
        </LineChart>
      </div>
    </div>
  );
}

export default ChartsMaps;
