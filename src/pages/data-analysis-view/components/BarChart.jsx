import React, { useState } from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";
import Icon from "../../../components/AppIcon";

const BarChart = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-border rounded shadow-md">
          <p className="font-medium text-sm">{label}</p>
          <p className="text-sm text-text-secondary mt-1">
            <span className="font-medium text-primary">{payload[0].value}</span>{" "}
            incidents reported
          </p>
          <div className="mt-2 pt-2 border-t border-border">
            <p className="text-xs text-text-tertiary">
              Click for detailed breakdown
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  // Handle click on bar
  const handleClick = (data, index) => {
    setActiveIndex(index === activeIndex ? null : index);
    console.log(
      `Selected category: ${data.category} with ${data.count} incidents`
    );
    // In a real app, this would trigger a detailed view or filter the data
  };

  // Handle empty data
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex flex-col items-center justify-center text-center">
        <Icon name="FileBar" size={32} className="text-text-tertiary mb-2" />
        <p className="text-text-secondary">
          No data available for the selected filters
        </p>
      </div>
    );
  }

  return (
    <div className="h-64" aria-label="Crime Categories Comparison Bar Chart">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 60 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#E2E8F0"
          />
          <XAxis
            dataKey="category"
            tick={{
              fontSize: 12,
              fill: "#475569",
              angle: -45,
              textAnchor: "end",
            }}
            interval={0}
            axisLine={{ stroke: "#CBD5E1" }}
            tickLine={{ stroke: "#CBD5E1" }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#475569" }}
            axisLine={{ stroke: "#CBD5E1" }}
            tickLine={{ stroke: "#CBD5E1" }}
            width={40}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="top"
            height={36}
            formatter={(value) => (
              <span className="text-sm font-medium">Incident Count</span>
            )}
          />
          <Bar
            dataKey="count"
            name="Incident Count"
            fill="#2563EB"
            onClick={handleClick}
            cursor="pointer"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={index === activeIndex ? "#1E40AF" : "#2563EB"}
                opacity={
                  activeIndex === null || index === activeIndex ? 1 : 0.7
                }
              />
            ))}
          </Bar>
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
