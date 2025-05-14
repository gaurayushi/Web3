import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

const ComparisonGraph = ({ updatedScore , percentile}) => {
  const [data, setData] = useState([
    { percentile: 0, score: 2 },
    { percentile: 10, score: 5 },
    { percentile: 30, score: 10 },
    { percentile: 50, score: 7 },
    { percentile: 75, score: 15 },
    { percentile: 100, score: 3 }
  ]);

  useEffect(() => {
    if (updatedScore) {
      setData((prevData) => [
        ...prevData.slice(1),
        { percentile: Math.random() * 100, score: updatedScore }
      ]);
    }
  }, [updatedScore]);

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg border border-gray-200 relative">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Comparison Graph
      </h3>
      <p className="text-sm text-gray-500">
        <span className="font-bold">You scored {percentile}% </span> which is
        lower than the average percentile 72% of all the engineers who took this
        assessment.
      </p>


      <div className="relative mt-4">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="percentile"
              tick={{ fill: "#718096", fontSize: 12 }}
            />
            <YAxis tick={{ fill: "#718096", fontSize: 12 }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                borderRadius: "5px",
                padding: "5px",
                fontSize: "12px"
              }}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#4F46E5"
              strokeWidth={2}
              dot={{ fill: "#4F46E5", r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>

        {/* Custom Text Labels on Graph */}
        <div className="absolute top-16 left-10 text-xs text-gray-600">
          your percentile
        </div>
        <div className="absolute top-6 right-14 bg-white p-1 rounded shadow text-xs">
          <p className="text-gray-900 font-semibold">{updatedScore || 90}</p>
          <p className="text-blue-500 text-xs">numberOfStudent : 4</p>
        </div>


      </div>
    </div>
  );
};

export default ComparisonGraph;
