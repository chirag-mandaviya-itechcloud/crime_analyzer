import React, { useState } from "react";
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import Icon from "../../../components/AppIcon";

const LineChart = ({ data }) => {
  const [hoveredData, setHoveredData] = useState(null);

  // Format date for display
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const date = new Date(label);
      const formattedDate = date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      
      return (
        <div className="bg-white p-3 border border-border rounded shadow-md">
          <p className="font-medium text-sm">{formattedDate}</p>
          <p className="text-sm text-text-secondary mt-1">
            <span className="font-medium text-primary">{payload[0].value}</span> incidents reported
          </p>
        </div>
      );
    }
    return null;
  };

  // Handle empty data
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex flex-col items-center justify-center text-center">
        <Icon name="FileBar" size={32} className="text-text-tertiary mb-2" />
        <p className="text-text-secondary">No data available for the selected filters</p>
      </div>
    );
  }

  return (
    <div className="h-64" aria-label="Crime Frequency Over Time Line Chart">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          onMouseMove={(e) => {
            if (e && e.activePayload) {
              setHoveredData(e.activePayload[0]?.payload);
            }
          }}
          onMouseLeave={() => setHoveredData(null)}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatDate}
            tick={{ fontSize: 12, fill: '#475569' }}
            axisLine={{ stroke: '#CBD5E1' }}
            tickLine={{ stroke: '#CBD5E1' }}
          />
          <YAxis 
            tick={{ fontSize: 12, fill: '#475569' }}
            axisLine={{ stroke: '#CBD5E1' }}
            tickLine={{ stroke: '#CBD5E1' }}
            width={30}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="top" 
            height={36}
            formatter={(value) => <span className="text-sm font-medium">Reported Incidents</span>}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#1D4ED8"
            strokeWidth={2}
            dot={{ r: 4, strokeWidth: 2 }}
            activeDot={{ r: 6, stroke: "#1E40AF", strokeWidth: 2 }}
            name="Reported Incidents"
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;