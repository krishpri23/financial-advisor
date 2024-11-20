import React from "react";
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const BarChartDashboard = ({ budgetList }) => {
  return (
    <div className="border rounded-2xl p-5">
      <h2 className="text-lg font-bold"> Activity</h2>
      <ResponsiveContainer width={"80%"} height={300}>
        <BarChart
          width={400}
          height={400}
          data={budgetList}
          margin={{ top: 7 }}
          maxBarSize={10}
          barSize={10}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar dataKey="Total Spent" stackId="a" fill="#4845d2" />
          <Bar dataKey="Amount" stackId="a" fill="#c3ceff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartDashboard;
