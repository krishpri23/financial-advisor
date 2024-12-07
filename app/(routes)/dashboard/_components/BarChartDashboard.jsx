import React from 'react';
import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const BarChartDashboard = ({ budgetList }) => {
  console.log('BARCHAR DASHBOARD', budgetList);
  return (
    <div className="border rounded-2xl p-5">
      <h2 className="text-lg font-bold"> Activity</h2>
      <ResponsiveContainer width={'80%'} height={300}>
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

          <Bar dataKey="totalSpent" stackId="a" fill="#4845d2" />
          <Bar dataKey="amount" stackId="a" fill="#c3ceff" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartDashboard;
